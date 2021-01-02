import React, { useState, useCallback} from 'react';
import { BookCard,PrimaryButton, SecondaryButton,TextInput } from "../components/UIkit"
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/styles";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import {PostEditDialog,SearchResultDialog,SetMapArea} from "../components/Posts";
import {Container,Box} from "@material-ui/core";
import {saveReadingPost,saveRegisteredPost} from "../reducks/posts/operations";
import {useDispatch} from "react-redux";
import { Form, Field } from 'react-final-form'
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme)=>({
  titleTypography: {
    color: theme.palette.primary.main,
    fontSize: "2rem",
    paddingBottom: theme.spacing(2),
  },
  subTitleTypography: {
    color: theme.palette.grey["700"],
    fontSize: "1.5rem",
  },
  searchField: {
    display: "flex",
  }
}))

const PostEdit = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("")
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [url,setUrl] = useState("#");
  const [mapItems, setMapItems] = useState([]);

  const inputQuery = useCallback((event) => {
    setQuery(event.target.value)
  },[setQuery])

  const getSearchBooks = (inputText) => {
    const query = inputText.replace("　","+").replace(" ","+")
    if (query === "") {
      return false
    } else {
      const baseUrl = "https://www.googleapis.com/books/v1/volumes";
      const params = "?q=" + query + "&maxResults=20&Country=JP"

      axios.get(baseUrl+params)
      .then(response => {
        setSearchResults(response.data.items)
        setSearchModalOpen(true)
      })
      .catch(error => {
        console.log(error)
      });
    }
  }

  const handleSearchModalClose = useCallback(() => {
    setSearchModalOpen(false)
  }, [setSearchModalOpen]);

  const handleSaveModalOpen = useCallback(() => {
    setSaveModalOpen(true)
  }, [setSaveModalOpen]);

  const handleSaveModalClose = useCallback(() => {
    setSaveModalOpen(false)
  }, [setSaveModalOpen]);

  const handleClickSearchIcon = () => {
    getSearchBooks(query)
  };

  const handleSaveReadingPost = useCallback(() => {
    dispatch(saveReadingPost(title,url,author,image,mapItems))
  },[dispatch,title,url,author,image,mapItems])

  const handleSaveRegisteredPost = useCallback(() => {
    dispatch(saveRegisteredPost(title,url,author,image,mapItems))
  },[dispatch,title,url,author,image,mapItems])

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Container maxWidth="md" style={{backgroundColor:"white"}}>
      <Typography variant="h2" className={classes.titleTypography}>
        POST登録
      </Typography>
      <Typography variant="h3" className={classes.subTitleTypography}>
        書籍登録
      </Typography>
      <Box className={classes.searchField}>
        <TextInput
          fullWidth={true} label={"タイトル / 著者名 で 検索"} multiline={false} required={true}
          onChange={inputQuery} rows={1} type={"text"}
        />
        <IconButton onClick={() => handleClickSearchIcon()}>
          <SearchIcon/>
        </IconButton>
      </Box>
      <SearchResultDialog
        open={searchModalOpen} searchResults={searchResults} handleClose={handleSearchModalClose}
        setTitle={setTitle} setAuthor={setAuthor} setImage={setImage} setUrl={setUrl}
      />
      <BookCard title={title} author={author} image={image} />
      <Box style={{height:24}}/>
      <Typography variant="h3" className={classes.subTitleTypography}>
        読書メンタルマップ
      </Typography>
      <SetMapArea mapItems={mapItems} setMapItems={setMapItems}  />

      {/* <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators
        }}
        render={({
          handleSubmit,
          form: {
            mutators: { push, pop }
          }, // injected from final-form-arrays above
          pristine,
          form,
          submitting,
          values
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <FieldArray name="mapItems">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <div key={name}>
                      <label>マップ{index + 1}</label>
                      <Field
                        name={`${name}.firstName`}
                        component="input"
                        placeholder="マップアイテムを入力"
                      />
                      <span
                        onClick={() => fields.remove(index)}
                      >
                        <HighlightOffIcon/>
                      </span>
                    </div>
                  ))
                }
              </FieldArray>

              <Box>
                <PrimaryButton
                  label="マップアイテムを追加"
                  onClick={() => push('mapItems', undefined)}
                />
              </Box>

              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
              </div>
              <Box>
                <PrimaryButton
                  label="保存"
                  type="submit"
                  onClick={() => push('mapItems', undefined)}
                />
              </Box>
            </form>
          )
        }}
      /> */}




      <Box textAlign="center" mt={4}>
        {/* <PrimaryButton
          label="POSTを登録！"
          onClick={() => dispatch(saveRegisteredPost(title,url,author,image,mapItems))}
        /> */}
        <SecondaryButton
          label="登録!"
          onClick={handleSaveModalOpen}
        />
      </Box>
      <PostEditDialog
        open={saveModalOpen}
        handleClose={handleSaveModalClose}
        handleSaveReadingPost={handleSaveReadingPost}
        handleSaveRegisteredPost={handleSaveRegisteredPost}
        title="書籍を読書中アイテムとしてセットしますか？"
        contentText="読書中の切り替えは後からでも変更できます"
      />
    </Container>
  );
};

export default PostEdit