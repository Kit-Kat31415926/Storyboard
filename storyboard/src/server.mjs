import express from 'express';
import path from 'path';
import cors from 'cors';
import { writeFile, readdir, unlink } from 'fs/promises';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const DRAW_THINGS_URL = 'http://127.0.0.1:7860/sdapi/v1/txt2img';
const IMAGES_DIR = path.join(__dirname, 'assets', 'images');

// Function to delete all files in a directory
async function cleanDirectory(directory) {
    const files = await readdir(directory);
    const deletionPromises = files.map(file =>
        unlink(path.join(directory, file))
    );
    await Promise.all(deletionPromises);
}

app.post('/generate-single-image', async (req, res) => {
    const { title, description, selectedStyle } = req.body;

    const prompt = `${title}. ${description}. Style: ${selectedStyle}`;

    const params = {
        prompt,
        negative_prompt: '',
        // negative_prompt: '(worst quality, low quality, normal quality, (variations):1.4), blur:1.5',
        seed: -1,
        steps: 20,
        guidance_scale: 4,
        batch_count: 1,
        width: 512,
        height: 512,
    };

    try {
        // Clean the images directory before generating new image
        await cleanDirectory(IMAGES_DIR);

        console.log('Sending request to API with params:', JSON.stringify(params));
        const response = await fetch(DRAW_THINGS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params),
        });

        const responseBody = await response.text();
        console.log('API Response status:', response.status);
        console.log('API Response headers:', JSON.stringify(response.headers.raw()));
        console.log('API Response body preview:', responseBody.substring(0, 100));

        if (!response.ok) {
            return res.status(response.status).json({ error: `Failed to generate image: ${responseBody}` });
        }

        let data;
        try {
            data = JSON.parse(responseBody);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).json({ error: `Failed to parse API response: ${parseError.message}` });
        }

        if (!data.images || !data.images.length) {
            console.error('No images in API response');
            return res.status(500).json({ error: 'No images returned from the API' });
        }

        const imageData = data.images[0];
        console.log('Image data type:', typeof imageData);
        console.log('Image data length:', imageData.length);
        console.log('Image data preview:', imageData.substring(0, 100));

        const base64Image = imageData;
        const fileName = `generated_image_${Date.now()}.png`;
        const filePath = path.join(IMAGES_DIR, fileName);

        await writeFile(filePath, base64Image, 'base64');

        res.json({ imageUrl: `/assets/images/${fileName}` });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: `Error generating image: ${error.message}`, stack: error.stack });
    }
});

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});