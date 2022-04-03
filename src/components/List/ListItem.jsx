import { useState } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import ItemDetail from './ItemDetail'

const ListItem = (props) => {
	const { name, url } = props
	const [open, setOpen] = useState(false)
	const id = url.split("/").reverse()[1]
	const capitalizedFirstLetterName = name.charAt(0).toUpperCase() + name.slice(1)
  return (
		<>
			<TableRow>
				<TableCell sx={{ borderBottom: 'none' }} align='center'>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell align="center" sx={{ borderBottom: 'none' }}>
					{ id }
				</TableCell>
				<TableCell align="center" sx={{ borderBottom: 'none' }}>
					{ capitalizedFirstLetterName }
				</TableCell>
			</TableRow>
			<TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
						<ItemDetail open={open} url={url} name={capitalizedFirstLetterName}/>
          </Collapse>
        </TableCell>
      </TableRow>
		</>
  )
}

export default ListItem