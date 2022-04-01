import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import PokemonLogo from '../../assets/img/pokemonLogo.png'

function Header() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <div style={{ height: '40px' }}>
          <img src={PokemonLogo} alt="" style={{ maxHeight: '100%' }} />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
