import { useState, useEffect } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TablePagination from '@mui/material/TablePagination'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import axios from 'axios'
import ListItem from './ListItem'

const List = () => {
  const [page, setPage] = useState(0)
  const [offset, setOffset] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pokemons, setPokemons] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError('')
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${rowsPerPage}&offset=${offset}`)
      .then(res => {
        setPokemons(res.data.results)
        setCount(res.data.count)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setError(error)
      })
  }, [rowsPerPage, offset])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    setOffset(newPage * rowsPerPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0)
    setOffset(0)
  }

  return (
    <Container sx={{ my: 4 }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">Pokemon ID</TableCell>
              <TableCell align="center">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress/>
                </TableCell>
              </TableRow>
            )}
            {!loading && (
              pokemons.map((pokemon, index) => <ListItem key={index} {...pokemon} />)
            )}
          </TableBody>
        </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {error && <p>error</p>}
      </TableContainer>
    </Container>
  )
}

export default List