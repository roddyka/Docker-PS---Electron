const { ipcRenderer } = require('electron');

// Listar Containers com Redes e IPs
async function listContainers() {
  const containerList = document.getElementById('container-list');
  containerList.innerHTML = ''; // Limpa a lista

  const containers = await ipcRenderer.invoke('get-containers');
  if (containers.error) {
    containerList.innerHTML = `<tr><td colspan="5">Error: ${containers.error}</td></tr>`;
    return;
  }

  containers.forEach(container => {
    container.networks.forEach(network => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${container.name}</td>
        <td>${container.status}</td>
        <td>${network.networkName}</td>
        <td><a href="#"> ${network.ipAddress}</a></td>
        <td><button onclick="addToHosts('${network.ipAddress}')">Adicionar ao /etc/hosts</button></td>
      `;
      containerList.appendChild(row);
    });
  });
}

// Função para adicionar ao /etc/hosts
async function addToHosts(ipAddress) {
  const hostname = prompt(`Digite o nome para o IP ${ipAddress}:`);
  if (hostname) {
    try {
      await ipcRenderer.invoke('add-to-hosts', ipAddress, hostname);
      alert('Nome adicionado ao /etc/hosts com sucesso!');
    } catch (error) {
      alert('Erro ao adicionar nome ao /etc/hosts: ' + error.message);
    }
  }
}

// Listar Imagens (sem alterações)
async function listImages() {
  const imageList = document.getElementById('image-list');
  imageList.innerHTML = ''; // Limpa a lista

  const images = await ipcRenderer.invoke('get-images');
  if (images.error) {
    imageList.innerHTML = `<li>Error: ${images.error}</li>`;
    return;
  }

  images.forEach(image => {
    const item = document.createElement('li');
    item.textContent = `ID: ${image.Id} - RepoTags: ${image.RepoTags}`;
    imageList.appendChild(item);
  });
}
