
import ItemData from "./ItemData"
export default function ItemList({Dairydata}){
    return(
        <section className="ItemList">
            {Dairydata.map(products => (
                <ItemData product={products} key={products.id}  />
            ))}
        </section>
    )
}

