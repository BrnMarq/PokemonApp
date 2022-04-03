import { useState, useEffect } from "react"
import axios from 'axios'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import POKEMON_TYPES from '../../constants/pokemonTypes'

const ItemDetail = ({ url, open, name }) => {
  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const types = details?.types?.map(({ type }, index) => (
      <img src={POKEMON_TYPES[type.name]} key={index} alt='' height='15px' style={{ marginRight: '2px' }} />
    )
  )

  useEffect(() => {
    if (!open) return
    setLoading(true)
    setError('')
    axios.get(url)
      .then(res => {
        setDetails(res.data)
        setLoading(false)
        setError('')
      })
      .catch(error => {
        setLoading(false)
        setError(error)
      })
  }, [url, open])

  if (loading) return (
    <Box textAlign='center'>
      <CircularProgress />
    </Box>
  )

  
  if (!loading) {
    return (
      <Box>
        <Grid container spacing={1}>
          <Grid item container spacing={2} justifyContent='space-between' xs>
            <Grid item xs='auto'>
              <img src={ details?.sprites?.front_default } alt="" />
            </Grid>
            <Grid item xs='auto'>
              <Typography fontSize={18} fontWeight='bold'>
                { name }
              </Typography>
              <Typography fontSize={14}>
                Weight: { details?.weight / 10 } Kg
              </Typography>
              <Typography fontSize={14}>
                Height: { details?.height / 10 } m
              </Typography>
              <Typography fontSize={14} sx={{ '& > *' : { verticalAlign: 'middle' }}}>
                Types: { types }
              </Typography>
            </Grid>
            <Grid item xs='auto' display={{ xs: 'none', sm: 'block' }}>
              <Typography fontSize={18} fontWeight='bold'>Base Stats</Typography>
              <Grid container spacing={2}>
                <Grid item xs='auto'>
                  <Typography fontSize={14}>
                    Hp: { details?.stats?.[0].base_stat }
                  </Typography>
                  <Typography fontSize={14}>
                    Attack: { details?.stats?.[1].base_stat }
                  </Typography>
                  <Typography fontSize={14}>
                    Defense: { details?.stats?.[2].base_stat }
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography fontSize={14}>
                    Sp. Attack: { details?.stats?.[3].base_stat }
                  </Typography>
                  <Typography fontSize={14}>
                    Sp. Defense: { details?.stats?.[4].base_stat }
                  </Typography>
                  <Typography fontSize={14}>
                    Speed: { details?.stats?.[5].base_stat }
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs='auto' display={{ xs: 'none', md: 'block' }}>
              <Typography fontSize={18} fontWeight='bold'>Abilities</Typography>
              <Grid container spacing={2}>
                <Grid item xs='auto'>
                  { details?.abilities?.map(({ ability }, index) => {
                    const abilityName = ability?.name?.charAt(0)?.toUpperCase() + ability?.name?.slice(1)
                    return (
                      <Typography fontSize={14} key={index}>
                        - <Link href='#'>{abilityName}</Link>
                      </Typography>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs='auto' justifyContent='flex-end' alignItems='center'>
            <IconButton>
              <ChevronRightRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    )
  }
}

export default ItemDetail