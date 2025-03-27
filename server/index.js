import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import crypto from 'crypto';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const upload = multer({ dest: 'uploads/' });

mongoose.connect('mongodb+srv://sriramu26318:Rolemodelers@cluster0.lb8jjjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false }
});

const CertificateSchema = new mongoose.Schema({
    name: String,
    organization: String,
    issueDate: String,
    type: String,
    status: String,
    filePath: String,
    hash: String,
    verified: { type: Boolean, default: false }
});

const User = mongoose.model('User', UserSchema);
const Certificate = mongoose.model('Certificate', CertificateSchema);

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.headers['user-id']);
        if (user && user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Admin access required' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ email, password, name });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(400).json({ message: 'Registration failed', error: err.message });
    }
});

// Add an admin code that would be required for registration
const ADMIN_REGISTRATION_CODE = "1234567890"; // Admin registration code

app.post('/api/auth/admin/register', async (req, res) => {
    try {
        const { email, password, name, adminCode } = req.body;

        // Verify admin code
        if (adminCode !== ADMIN_REGISTRATION_CODE) {
            return res.status(403).json({ message: 'Invalid admin registration code' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new admin user
        const user = new User({
            email,
            password,
            name,
            isAdmin: true
        });
        await user.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        console.error('Admin registration error:', err);
        res.status(400).json({ message: 'Registration failed', error: err.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin // Include isAdmin status
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

app.post('/api/auth/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password, isAdmin: true });
        if (user) {
            res.json({
                message: 'Admin login successful',
                user: { id: user._id, name: user.name, email: user.email, isAdmin: true }
            });
        } else {
            res.status(401).json({ message: 'Invalid admin credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
});

app.get('/api/certificates', async (req, res) => {
    try {
        const certificates = await Certificate.find();
        res.json(certificates);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching certificates', error: err.message });
    }
});

// Update this function
const generateHash = async (fileBuffer) => {
    // Use subtle crypto like frontend
    const hashBuffer = await crypto.webcrypto.subtle.digest('SHA-256', fileBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

app.post('/api/certificates/upload', upload.single('file'), async (req, res) => {
    try {
        const fileBuffer = await fs.promises.readFile(req.file.path);
        const hash = await generateHash(fileBuffer);

        const certificate = new Certificate({
            ...req.body,
            status: 'Unverified',
            filePath: `http://localhost:5004/${req.file.path}`,
            hash: hash,
            verified: false
        });
        await certificate.save();
        res.status(201).json(certificate);
    } catch (err) {
        res.status(400).send({ message: 'Upload failed', error: err.message });
    }
});

app.post('/api/certificates/verify/:id', upload.single('file'), async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id);
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        const fileBuffer = await fs.promises.readFile(req.file.path);
        const uploadedHash = await generateHash(fileBuffer);

        const isVerified = uploadedHash === certificate.hash;

        certificate.verified = isVerified;
        certificate.status = isVerified ? 'Original' : 'Modified';
        await certificate.save();

        res.json({
            verified: isVerified,
            message: isVerified ? 'Certificate is authentic' : 'Certificate has been modified'
        });
    } catch (err) {
        res.status(500).json({ message: 'Verification failed', error: err.message });
    }
});

app.post('/api/certificates/verify-upload', async (req, res) => {
    try {
        const uploadedHash = req.body.hash;
        console.log('Received hash:', uploadedHash); // Debug log

        const certificate = await Certificate.findOne({ hash: uploadedHash });
        console.log('Found certificate:', certificate); // Debug log

        if (certificate) {
            res.json({
                verified: true,
                message: 'Certificate verified successfully',
                details: {
                    name: certificate.name,
                    organization: certificate.organization,
                    issueDate: certificate.issueDate,
                    status: 'Original'
                }
            });
        } else {
            res.json({
                verified: false,
                message: 'Certificate verification failed. This certificate is not in our records.',
                details: null
            });
        }
    } catch (err) {
        res.status(500).json({
            verified: false,
            message: 'Error during verification',
            error: err.message
        });
    }
});

app.delete('/api/certificates/:id', isAdmin, async (req, res) => {
    try {
        await Certificate.findByIdAndDelete(req.params.id);
        res.send({ message: 'Certificate deleted successfully' });
    } catch (err) {
        res.status(400).send({ message: 'Deletion failed', error: err.message });
    }
});

// Example Express.js route
app.get('/api/certificates/verify', async (req, res) => {
    try {
        const { id, hash } = req.query;

        // Look up certificate in admin database WITHOUT creating new records
        const certificate = await Certificate.findOne({
            _id: id,
            hash: hash
        });

        // Return verification result
        res.json({
            verified: !!certificate,
            details: certificate ? {
                issueDate: certificate.issueDate,
                organization: certificate.organization,
                // Other details you want to show
            } : null
        });
    } catch (error) {
        res.status(500).json({ error: 'Error verifying certificate' });
    }
});

// In your backend routes
app.get('/api/admin/certificates/verify', async (req, res) => {
    try {
        const { certificateId, hash } = req.query;
        console.log(`Verifying certificate ${certificateId} with hash ${hash}`);

        // Find matching certificate in admin records
        const adminCertificate = await AdminCertificateModel.findOne({
            _id: certificateId,
            hash: hash
        });

        // Return verification result
        res.json({
            verified: !!adminCertificate,
            message: adminCertificate
                ? "Certificate verified successfully"
                : "Certificate not found in admin records"
        });
    } catch (error) {
        console.error('Certificate verification error:', error);
        res.status(500).json({
            verified: false,
            error: 'Error verifying certificate'
        });
    }
});

app.listen(5004, () => console.log('Server running on http://localhost:5004')); // Updated port
