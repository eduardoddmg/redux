import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./store/cart-slice";

const lista = [
  {
    nome: "roupa1",
    id: 1,
    quantidade: 0,
    price: 10
  },
  {
    nome: "roupa2",
    id: 2,
    quantidade: 0,
    price: 20
  },
  {
    nome: "roupa3",
    id: 3,
    quantidade: 0,
    price: 30
  },
  {
    nome: "roupa4",
    id: 4,
    quantidade: 0,
    price: 40
  }
]

function App() {

  const dispatch = useDispatch();
  const total = useSelector(state => state.cart.total);
  const list = useSelector(state => state.cart.itemsList);
  const totalprice = useSelector(state => state.cart.totalPrice);

 
  return (
    <div>
      {lista.map((value, index) => <article key={index}>
        {value.nome}
        <button onClick={() => {
          dispatch(cartActions.adicionar({nome: value.nome, id: value.id, price: value.price}));
          console.log(list)
      }}>comprar</button>
      </article>)}
      total = {total}
      {list.length > 0 && list.map((value, index) => {
        return (
          <article>nome = {value.nome} preco = {value.price} quantidade = {value.quantidade}
            
            <button onClick={() => dispatch(cartActions.apagar({id: value.id}))}>
              delete
            </button>
            <button onClick={() => dispatch(cartActions.apagarTudo({id: value.id}))}>
              delete all

            </button>
          </article>
        )
      })}    
      <br></br>totalprice: {totalprice}
      </div>
  );
}

export default App;
