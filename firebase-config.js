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
  // Escuta os Pedidos em tempo real
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
    });
  },

  // Escuta as Finanças em tempo real
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
    });
  },

  // Salva ou atualiza um pedido
  savePedido(pedido) {
    if (pedido.id) {
      return set(ref(db, `pedidos/${pedido.id}`), pedido);
    } else {
      const newRef = push(ref(db, 'pedidos'));
      pedido.id = newRef.key;
      return set(newRef, pedido);
    }
  },

  // Deleta um pedido
  deletePedido(id) {
    return remove(ref(db, `pedidos/${id}`));
  },

  // Salva ou atualiza um lançamento financeiro
  saveFinanca(financa) {
    if (financa.id) {
      return set(ref(db, `financas/${financa.id}`), financa);
    } else {
      const newRef = push(ref(db, 'financas'));
      financa.id = newRef.key;
      return set(newRef, financa);
    }
  },

  // Deleta um lançamento financeiro
  deleteFinanca(id) {
    return remove(ref(db, `financas/${id}`));
  }
};