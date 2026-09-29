// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue, set, push, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC1jwUTzCC2FRZ6FjGc0ZvI7ech7tUNwi4",
  authDomain: "elohimekadosh.firebaseapp.com",
  databaseURL: "https://elohimekadosh-default-rtdb.firebaseio.com",
  projectId: "elohimekadosh",
  storageBucket: "elohimekadosh.firebasestorage.app",
  messagingSenderId: "830982284704",
  appId: "1:830982284704:web:16220a5c1c98feaf5670c5"
};

// Inicializa o Firebase e o Realtime Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Expõe métodos para manipulação global pelo index.html
window.FirebaseDB = {
  // --- CLIENTES / CADASTROS ---
  listenClientes(callback) {
    const clientesRef = ref(db, 'clientes');
    onValue(clientesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        callback(list);
      } else {
        callback([]);
      }
    }, (error) => {
      console.error("Erro ao escutar clientes no Firebase:", error);
    });
  },

  saveCliente(cliente) {
    const dataToSave = JSON.parse(JSON.stringify(cliente));
    if (dataToSave.id) {
      return set(ref(db, `clientes/${dataToSave.id}`), dataToSave);
    } else {
      const newRef = push(ref(db, 'clientes'));
      dataToSave.id = newRef.key;
      return set(newRef, dataToSave);
    }
  },

  deleteCliente(id) {
    return remove(ref(db, `clientes/${id}`));
  },

  // Atalho caso seu código chame saveCadastro
  saveCadastro(dados) {
    return this.saveCliente(dados);
  },

  // --- PEDIDOS ---
  listenPedidos(callback) {
    const pedidosRef = ref(db, 'pedidos');
    onValue(pedidosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        callback(list);
      } else {
        callback([]);
      }
    }, (error) => {
      console.error("Erro ao escutar pedidos no Firebase:", error);
    });
  },

  savePedido(pedido) {
    const dataToSave = JSON.parse(JSON.stringify(pedido));
    if (dataToSave.id) {
      return set(ref(db, `pedidos/${dataToSave.id}`), dataToSave);
    } else {
      const newRef = push(ref(db, 'pedidos'));
      dataToSave.id = newRef.key;
      return set(newRef, dataToSave);
    }
  },

  deletePedido(id) {
    return remove(ref(db, `pedidos/${id}`));
  },

  // --- FINANÇAS ---
  listenFinancas(callback) {
    const financasRef = ref(db, 'financas');
    onValue(financasRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        callback(list);
      } else {
        callback([]);
      }
    }, (error) => {
      console.error("Erro ao escutar finanças no Firebase:", error);
    });
  },

  saveFinanca(financa) {
    const dataToSave = JSON.parse(JSON.stringify(financa));
    if (dataToSave.id) {
      return set(ref(db, `financas/${dataToSave.id}`), dataToSave);
    } else {
      const newRef = push(ref(db, 'financas'));
      dataToSave.id = newRef.key;
      return set(newRef, dataToSave);
    }
  }
};