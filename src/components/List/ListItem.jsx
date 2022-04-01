import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

const ListItem = (props) => {
	const { name, url } = props
	const id = url.split("/").reverse()[1]
	const capitalizedFirstLetterName = name.charAt(0).toUpperCase() + name.slice(1)
  return (
    <TableRow>
			<TableCell />
			<TableCell align="center">
				{ id }
			</TableCell>
			<TableCell align="center">
				{ capitalizedFirstLetterName }
			</TableCell>
		</TableRow>
  )
}

export default ListItem