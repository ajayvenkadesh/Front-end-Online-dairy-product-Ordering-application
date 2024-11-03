
    import { Link,useNavigate } from "react-router-dom";
    import Button from '@mui/material/Button';

    export default function ItemData({ product,isLoggedIn }) {

        const navigate = useNavigate();

        const handleBuyNowClick = () => {
            
            if (isLoggedIn) {
            
            navigate(`/order/${product.id}`, { state: { product } });
            } else {    
            
            navigate('/login', { state: { from: `/order/${product.id}` } });
            }
        };
    return (
        <div className="ItemData">
        
            <section>
            <img src={product.image} alt={product.name} />
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p>Rs {product.price}</p>
            </section>
        

        
        <Link to={`/order/${product.id}`} state={{ product }}> 
            <Button variant="contained" onClick={handleBuyNowClick} sx={{
                backgroundColor: '#A0DFEF',
                color: 'white',
                fontSize: '5px',
                fontWeight: 'bold',
                borderRadius: '10px',
                padding: '10px 20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}>
            Buy Now
            </Button>
            </Link>
        
        </div>
    );
    }
