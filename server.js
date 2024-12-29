const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// إعداد Body Parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// استقبال الصور وحفظها
app.post('/upload', (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).send('No image provided');
  }

  // حفظ الصورة
  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const fileName = `image_${Date.now()}.png`;

  // التأكد من وجود مجلد "uploads"
  const uploadDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  fs.writeFileSync(path.join(uploadDir, fileName), base64Data, 'base64');
  console.log(`Image saved: ${fileName}`);
  res.send('Image received and saved successfully!');
});

// بدء الخادم
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
