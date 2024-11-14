const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Docker = require('dockerode');
const fs = require('fs');
const docker = new Docker();
const hostsFilePath = '/etc/hosts';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/docker.png',
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'),
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  win.loadFile('index.html');
}

// Listar Containers com Redes e IPs
ipcMain.handle('get-containers', async () => {
  try {
    const containers = await docker.listContainers({ all: true });
    
    const containerDetails = containers.map(container => {
      const networkInfo = [];
      for (const [networkName, networkData] of Object.entries(container.NetworkSettings.Networks)) {
        networkInfo.push({
          networkName,
          ipAddress: networkData.IPAddress
        });
      }

      return {
        id: container.Id,
        name: container.Names[0],
        status: container.Status,
        networks: networkInfo,
      };
    });

    return containerDetails;
  } catch (error) {
    return { error: error.message };
  }
});

// Adicionar ao /etc/hosts
ipcMain.handle('add-to-hosts', async (event, ipAddress, hostname) => {
  try {
    // Lê o arquivo /etc/hosts
    const hostsFile = fs.readFileSync(hostsFilePath, 'utf8');

    // Verifica se a entrada já existe
    const regex = new RegExp(`\\s*${ipAddress}\\s+${hostname}\\s*`);
    if (regex.test(hostsFile)) {
      throw new Error('Este nome já existe no /etc/hosts.');
    }

    // Adiciona a nova entrada
    const newEntry = `${ipAddress} ${hostname}\n`;
    fs.appendFileSync(hostsFilePath, newEntry);

    return { success: true };
  } catch (error) {
    throw new Error('Falha ao modificar o /etc/hosts: ' + error.message);
  }
});

// Listar Imagens
ipcMain.handle('get-images', async () => {
  try {
    const images = await docker.listImages();
    return images;
  } catch (error) {
    return { error: error.message };
  }
});

app.on('ready', createWindow);
