## Build a basic version of PayTM

## Running the Application on Your Local Machine

This guide details the steps to get the application up and running on your local machine.

**Prerequisites:**

- A code editor or IDE of your choice (e.g., Visual Studio Code, Sublime Text, Atom)
- Git version control system (https://git-scm.com/)

**Software Installation:**

1. **Docker:**
   - Download and install Docker Desktop for your operating system from the official website: https://www.docker.com/products/docker-desktop/
   - Follow the on-screen instructions for a successful installation.

**Application Setup:**

2. **Clone the Repository:**

   Open your terminal or command prompt and navigate to the desired directory where you want to clone the application's codebase.

   Run the following command, replacing `<url>` with the actual repository URL:

   ```bash
    git clone <url>
    cd <repository_name>

   ```

3. **Start Docker-Desktop:**

   Open the Docker application you installed earlier. It usually runs in the background, so you might need to search for it in your taskbar or application launcher.

4. **Build MongoDB Image:**

   In your terminal within the project directory, run the following command to build a Docker image for MongoDB:

   ```bash
    docker build -t mongodb .
   ```

   This command creates a Docker image named mongodb from the Dockerfile present in the current directory (.).

5. **Run the MongoDB container:**

   Start a MongoDB container named mongoContainer and map its internal port 27017 to your local machine's port 27017:

   ```bash
   docker run -d --name mongoContainer -p 27017:27017 mongodb
   ```

6. **Configure backend:**

   - Navigate to backend directore:

   ```bash
   cd backend
   ```

   - Install Dependencies:

   ```bash
   npm install
   ```

   - Start server;

   ```bash
   npm start
   ```

7. **\*Start frontend:**

   - Navigate to frontend:

   ```bash
   cd ..
   cd frontend
   ```

   - Install Dependencies:

   ```bash
   npm install
   ```

   - Run frontend:

   ```bash
   npm run dev
   ```
