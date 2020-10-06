import React, {useCallback, useState} from 'react';
import {TextInput} from "../UIkit";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core"

const useStyles = makeStyles((theme)=>({
  checkIcon: {
    float: "right"
  },
  iconCell: {
    height: 48,
    width: 48
  },
  inputMapItemArea: {
    display: "flex",
    padding: theme.spacing(1)
  }
}))

const SetSizeArea = (props) => {
  const classes = useStyles();

  const [index, setIndex] = useState(0),
        [mapItem, setMapItem] = useState("")

  const inputMapItem = useCallback((event)=>{
    setMapItem(event.target.value)
  },[setMapItem]);

  const addMapItem = (index, mapItem) => {
    if (mapItem === "") {
      return false
    } else {
      if (index === props.mapItems.length) {
        props.setMapItems(prevState => [...prevState, {mapItem:mapItem}])
        setIndex(index + 1)
        setMapItem("")
      } else {
        const newMapItems = props.mapItems
        newMapItems[index] = {mapItem:mapItem}
        props.setMapItems(newMapItems)
        setIndex(newMapItems.length)
        setMapItem("")
      }
    }
  };

  const editMapItem = (index,mapItem) => {
    setIndex(index);
    setMapItem(mapItem);
  }

  const deleteMapItem = (deleteIndex) => {
    const newMapItems = props.mapItems.filter((item,i) => i !== deleteIndex);
    props.setMapItems(newMapItems);
  }

  // const memoIndex = useMemo(() => {
  //   setIndex(props.mapItems.length)
  // },[props.mapItems.length])


  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>マップアイテム</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody >
            { props.mapItems.length > 0 && (
              props.mapItems.map((item,i) => (
                <TableRow key={item.mapItem}>
                  <TableCell>{(i+1)}</TableCell>
                  <TableCell>{item.mapItem}</TableCell>
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => editMapItem(i,item.mapItem)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton className={classes.iconCell} onClick={() => deleteMapItem(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <Box className={classes.inputMapItemArea}>
          <TextInput
            fullWidth={true} label={"マップアイテムを入力"} multiline={true} requires={true}
            onChange={inputMapItem} rows={5} value={mapItem} type={"text"}
          />
          <IconButton className={classes.checkIcon} onClick={() => addMapItem(index, mapItem)}>
            <CheckCircleIcon/>
          </IconButton>
        </Box>
      </TableContainer>
    </Box>
  )
}

export default SetSizeArea