import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Box, Divider, Paper, Typography } from "@material-ui/core";
import { BookCard } from "../UIkit";
import { MapItemCard } from "./index";
import { SecondaryButton, QuestionDialog } from "../UIkit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { push } from "connected-react-router";
import { updateStatusToCompleted } from "../../reducks/posts/operations";
import { TwitterShareButton, TwitterIcon } from "react-share";

const ReadingBookDetail = (props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleUpdateStatus = useCallback(() => {
    dispatch(updateStatusToCompleted(props.post));
    handleClose();
    dispatch(push("/mypage"));
  }, [dispatch, handleClose, props]);

  return (
    <div>
      <Paper>
        <Box p={1}>
          <Typography component="h3">
            <Box fontSize="1.5rem" fontWeight="fontWeightBold">
              書籍情報
            </Box>
          </Typography>
          <Divider />
          <Box my={3}>
            <BookCard
              title={props.post.title}
              author={props.post.author}
              image={props.post.image}
            />
          </Box>

          <Typography component="h3">
            <Box fontSize="1.5rem" fontWeight="fontWeightBold">
              メンタルマップ
            </Box>
          </Typography>
          <Divider />

          {props.post.post_items.map((mapItem) => (
            <Box key={mapItem.id} my={2}>
              <MapItemCard content={mapItem.content} />
            </Box>
          ))}

          {props.post.status === "reading" && (
            <Box>
              <Box display="flex" justifyContent="center" my={4}>
                <SecondaryButton label="完読した!" onClick={handleClickOpen} />
              </Box>

              <Box display="flex" justifyContent="center">
                <Box my={1}>
                  <Button
                    variant="contained"
                    color="default"
                    startIcon={<EditIcon />}
                  >
                    編集
                  </Button>
                </Box>
                <Box m={1}>
                  <Button
                    variant="outlined"
                    color="default"
                    startIcon={<DeleteIcon />}
                  >
                    削除
                  </Button>
                </Box>
              </Box>

              <QuestionDialog
                open={open}
                handleClose={handleClose}
                handleEvent={handleUpdateStatus}
                title="完読にしてよろしいですか？"
                contentText="一度完読にしたアイテムは、元には戻せません"
              />
            </Box>
          )}
          <TwitterShareButton
            url={"https://www.sambaiz.net"}
            title={"タイトル"}
          >
            <TwitterIcon size={64} round />
          </TwitterShareButton>
        </Box>
      </Paper>
    </div>
  );
};

export default ReadingBookDetail;
