import { Link } from 'react-router-dom';
import cartSvg from '../../assets/icons/cartSvg.svg';
import '../../scss/header.scss';
import { useSelector} from 'react-redux';
import { RootState } from '../../redux/store';
function Header() {
    const totalCount  = useSelector<RootState>(({ cart }) => cart.totalCount);

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to='/'><div className="header__title">Test_Optimax</div></Link>
                    <div className="header__cart">
                        <Link to="/cart">
                            <img  className="header__cart-img" data-testid="cartSvg" src={cartSvg}/>
                            <span className="header__cart-badge">{totalCount}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header