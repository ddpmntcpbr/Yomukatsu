import  React  from  "react";
import { makeStyles } from "@material-ui/styles";
import  { Box,
          Dialog,
          DialogContent,
          DialogTitle,
          Divider
        } from  '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme)=>({
  dialogTitle:{
    fontSize: "1.5rem"
  },
  title: {
    fontWeight: "bold",
    color: theme.palette.grey[900],
    fontSize: "1.2rem",
    marginTop: theme.spacing(2)
  },
  content: {
    color: theme.palette.grey[800],
    fontSize: "1rem",
    padding: theme.spacing(1)
  },
}))

const PostItemEditHintDialog = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      style={{maxHeight: "90%"}}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <DialogTitle>
            <Box className={classes.dialogTitle}>
              マップ作成のヒント
            </Box>
          </DialogTitle>
        </Box>
        <Box mx={2}>
          <IconButton onClick={()=>props.handleClose()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <DialogContent>
          <Box>
            <Box className={classes.title}>
              1. 目次だけ読んでみよう！
            </Box>
            <Divider />
            <Box className={classes.content}>
              一番王道のやり方！<br/>
              <br/>
              目次だけ目を通し、興味・関心のあった箇所を見つけてみましょう。<br/>
              余裕があれば「はじめに」と「おわりに」も読んでみると、よりマップ作成のアイディアが生まれてきやすいです
            </Box>
          </Box>

          <Box>
            <Box className={classes.title}>
              2. 他人レビューを読んでみよう！
            </Box>
            <Divider />
            <Box className={classes.content}>
              思い切って、先にレビューを読んでしまうのも有効な手段です。<br/>
              <br/>
              小説であればネタバレは避けたいですが、ビジネス書のような情報収集が目的の読書であれば、他人のレビューは、モチベーションを得る重要なヒントになり得ます。<br/>
              <br/>
              Amazon: <Link href="https://www.amazon.co.jp" target="_blank" rel="noopener">https://www.amazon.co.jp</Link><br/>
              楽天ブックス: <Link href="https://books.rakuten.co.jp" target="_blank" rel="noopener">https://books.rakuten.co.jp</Link><br/>
              Google Book: <Link href="https://books.google.co.jp" target="_blank" rel="noopener">https://books.google.co.jp</Link>
            </Box>
          </Box>

          <Box>
            <Box className={classes.title}>
              3.  欲望に忠実になろう！
            </Box>
            <Divider />
            <Box className={classes.content}>
              ・お金がほしい！<br/>
              ・異性にモテたい！<br/>
              ・難しい本を読んでカッコつけたい！、、、<br/>
              <br/>
              そういった自身の根本的な欲求は、行動する大きなモチベーションです。<br/>
              <br/>
              Yomukatsuでは登録書籍をTwitterでシェアする機能がありますが、メンタルマップの中身は他人に公開されない仕様になっています。自分の気持ちに正直になりましょう！
            </Box>
          </Box>

          <Box>
            <Box className={classes.title}>
              4. 書籍を手に取ったきっかけを思い出そう
            </Box>
            <Divider />
            <Box className={classes.content}>
              ・書店でたまたま見かけた<br/>
              ・会社の先輩に勧められた<br/>
              ・著名なインフルエンサーがSNSで発信していた、、、<br/>
              <br/>
              その本を手にとった理由・動機が、何かしらはあったはず。それを思い出せれば、マップのヒントになるかも。
            </Box>
          </Box>

          <Box>
            <Box className={classes.title}>
              5. 読みながら随時更新していこう
            </Box>
            <Divider />
            <Box className={classes.content}>
              メンタルマップは、必ずしも最初に完成させる必要はありません。<br/>
              <br/>
              読みながら興味を持ったことが増えればどんどん更新する、くらいの気楽なイメージで取り組みましょう！
            </Box>
          </Box>
      </DialogContent>
    </Dialog>
)
}

export default PostItemEditHintDialog