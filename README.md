# Skillai (Skai)

Skillai is an AI-powered training assistant that enables users to interact with a professional trainer via voice, powered by 11Labs. It also features image recognition capabilities using `@tensorflow-models/mobilenet`. The application is built with Next.js for the frontend, Prisma for the backend, and ShadCN UI for a sleek and modern interface.

## 🚀 Features

- **AI Trainer Interaction** – Talk to a professional AI trainer using 11Labs.
- **Image Recognition** – Identify and analyze images with TensorFlow MobileNet.
- **Modern UI** – Built with ShadCN UI for a clean and elegant design.
- **Efficient Backend** – Powered by Prisma for seamless database management.
- **Next.js Frontend** – Optimized for performance and scalability.

## 🛠 Tech Stack

- **Frontend:** Next.js, ShadCN UI
- **Backend:** Prisma, Node.js
- **AI & ML:** 11Labs (Voice AI), TensorFlow MobileNet (Image Recognition)
- **Database:** PostgreSQL (or another Prisma-supported DB)

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/skillai.git
   cd skillai
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_11LABS_API_KEY=your_11labs_api_key
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## 🖥 Usage

- Access the web application at `http://localhost:3000`.
- Speak with the AI trainer using voice commands.
- Upload or analyze images for recognition.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under [MIT License](LICENSE).

---

Made with ❤️ by Tiavina Andriamamivony.

