# Electron Docker Manager

This application is a simple Electron-based Docker manager that allows users to:
- List Docker containers, including their networks and IP addresses.
- Add container network entries to the `/etc/hosts` file for easier access.
- List all available Docker images.

## Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- Docker must be installed and running on your system.
- You need permission to modify `/etc/hosts`. For this, you may need to run the application with elevated privileges.

## Setup

1. Clone this repository to your local machine.
2. Open a terminal in the project directory.
3. Run the following command to install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the Electron application by running:

    ```bash
    npm start
    ```

2. Once the app opens, you can:
   - View all Docker containers and their network information.
   - Add entries to your `/etc/hosts` file for easier access to Docker container IPs by hostname.
   - List all Docker images available on your system.

## Important Notes

- **Modifying `/etc/hosts`:** Make sure to run the application with the necessary permissions to modify the `/etc/hosts` file.
- **Docker Permissions:** Ensure your user has the correct permissions to interact with Docker, or use `sudo` if needed.

## Dependencies

This project uses the following npm packages:
- `electron`: For building the desktop application.
- `dockerode`: For Docker API interaction.
- `fs`: To handle file system operations.

## Contact

For updates and feedback, follow me on Twitter: [@roddyka](https://twitter.com/roddykan)

## License

This project is licensed under the MIT License.
