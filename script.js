// lista de itens armazenada no localStorage ou array vazio se não houver
const items = JSON.parse(localStorage.getItem('items')) || [];
// formulário de adição de itens
const form = document.getElementById('form-add-item');
// elemento onde os itens serão renderizados
const itemList = document.getElementById('item-list');
// elemento de notificação
const notification = document.getElementById('notification');
// botão para fechar a notificação
const closeNotification = document.getElementById('close-notification');

// Função para mostrar a notificação
function showNotification() {
  notification.classList.remove('message-hidden');
}

// Função para esconder a notificação
function hideNotification() {
  notification.classList.add('message-hidden');
}
// Função para renderizar os itens na tela
function renderItems() {
  // Limpa a lista antes
  itemList.innerHTML = '';
  // Itera sobre os itens e cria os elementos necessários para cada um
  items.forEach((item, index) => {
    // Cria o elemento li
    let li = document.createElement('li');
    // Cria o elemento div
    let div = document.createElement('div');
    // Cria o elemento input
    let input = document.createElement('input');
    // Cria o nó de texto
    let textNode = document.createTextNode(' ' + item);
    // Cria o botão de exclusão
    let deleteButton = document.createElement('button');

    // Configura o botão de exclusão com um ícone SVG
    deleteButton.type = 'button';
    deleteButton.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3.66666L12.5869 10.3501C12.4813 12.0576 12.4285 12.9114 12.0005 13.5253C11.7889 13.8287 11.5165 14.0849 11.2005 14.2773C10.5614 14.6667 9.706 14.6667 7.99513 14.6667C6.28208 14.6667 5.42553 14.6667 4.78603 14.2766C4.46987 14.0838 4.19733 13.8272 3.98579 13.5232C3.55792 12.9084 3.5063 12.0534 3.40307 10.3435L3 3.66666" stroke="#6B6671" stroke-linecap="round"/>
      <path d="M2 3.66668H14M10.7038 3.66668L10.2487 2.72783C9.9464 2.10418 9.7952 1.79236 9.53447 1.59788C9.47667 1.55474 9.4154 1.51637 9.35133 1.48314C9.0626 1.33334 8.71607 1.33334 8.023 1.33334C7.31253 1.33334 6.95733 1.33334 6.66379 1.48942C9.59873 1.52402 6.53665 1.56394 6.47819 1.60879C6.21443 1.81114 6.06709 2.13438 5.77241 2.78085L5.36861 3.66668" stroke="#6B6671" stroke-linecap="round"/>
      <path d="M6.33337 11V7" stroke="#6B6671" stroke-linecap="round"/>
      <path d="M9.66663 11V7" stroke="#6B6671" stroke-linecap="round"/>
    </svg>`;

    // Adiciona o evento de clique para deletar o item
    deleteButton.addEventListener('click', () => {
      // Remove o item do array e atualiza o localStorage
      items.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(items));
      // Re-renderiza a lista de itens
      renderItems();
      // Mostra a mensagem ao deletar
      showNotification(); 
    });

    // Configura o input como checkbox
    input.type = 'checkbox';
    input.name = 'item';
    input.value = item;

    // Monta a estrutura do item na lista 
    div.appendChild(input);
    div.appendChild(textNode);
    li.appendChild(div);
    li.appendChild(deleteButton);
  
    // Adiciona o item à lista
    itemList.appendChild(li);
  });
}
// Fecha a notificação ao clicar no botão X
closeNotification.addEventListener('click', hideNotification);

// Renderiza os itens na tela ao carregar a página
renderItems();
// Garante que começa escondida
hideNotification();

// Adiciona o evento de submit ao formulário para adicionar novos itens
form.addEventListener('submit', (event) => {
  // Previne o comportamento padrão do formulário para evitar recarregar a página
  event.preventDefault();

  // Pega o valor do input, remove espaços extras e verifica se não está vazio
  let input = form.querySelector('input[name="item"]');
  let newItem = input.value.trim();

  if (newItem) {
    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
    input.value = '';
    renderItems();
  }
});