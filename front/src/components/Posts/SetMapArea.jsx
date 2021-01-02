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
import { Box,Button } from "@material-ui/core"
import { PrimaryButton } from "../UIkit"
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme)=>({
  checkIcon: {
    float: "right"
  },
  iconCell: {
    height: 32,
    width: 32,
  },
  mapItemPaper: {
    padding: theme.spacing(1)
  },
  inputMapItemArea: {
    display: "flex",
    padding: theme.spacing(1)
  },
  inputButton: {
    display: "flex",
    justifyContent: "space-between"
  }
}))

const SetMapArea = (props) => {
  const classes = useStyles();

  const [index, setIndex] = useState(0),
        [mapItem, setMapItem] = useState(""),
        [inputFormOpen, setInutFormOpen] = useState(false)

  const inputMapItem = useCallback((event)=>{
    setMapItem(event.target.value)
  },[setMapItem]);

  const handleInputFormOpen = () => {
    setInutFormOpen(true);
  };

  const handleInputFormClose = () => {
    setMapItem("")
    setInutFormOpen(false);
  };

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
      handleInputFormClose()
    }
  };

  const editMapItem = (index,mapItem) => {
    handleInputFormOpen()
    setIndex(index);
    setMapItem(mapItem);
  }

  const deleteMapItem = (deleteIndex) => {
    const newMapItems = props.mapItems.filter((item,i) => i !== deleteIndex);
    props.setMapItems(newMapItems);
  }

  return (
    <Box my={2}>
      { props.mapItems.length > 0 && (
          props.mapItems.map((item,i) => (
            <Grid container spacing={3} key={item.mapItem} alignItems="center" justify="center">
              <Grid item xs={10}>
                <Paper className={classes.mapItemPaper} onClick={() => editMapItem(i,item.mapItem)}>
                  {item.mapItem}
                </Paper>
              </Grid>
              <Grid item xs={2}>
                <IconButton className={classes.iconCell} onClick={() => deleteMapItem(i)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))
      )}

      {inputFormOpen
        ?
        <Box>
          <TextInput
            fullWidth={true}
            label={"マップアイテムを入力"}
            multiline={true}
            requires={true}
            onChange={inputMapItem}
            rows={3}
            value={mapItem}
            type={"text"}
            autoFocus={true}
          />
          <Box className={classes.inputButton}>
            <Box>
              <Button
                variant="contained"
                color="default"
                startIcon={<RemoveIcon />}
                onClick={() => handleInputFormClose()}
              >
                キャンセル
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => addMapItem(index, mapItem)}
              >
              保存
              </Button>
            </Box>
          </Box>
        </Box>
        :
        <Box textAlign="center" my={2}>
          <Button
            variant="outlined"
            color="default"
            startIcon={<AddIcon />}
            onClick={() => handleInputFormOpen()}
          >
            マップアイテムを追加
          </Button>
        </Box>
        }
    </Box>
  )
}

export default SetMapArea