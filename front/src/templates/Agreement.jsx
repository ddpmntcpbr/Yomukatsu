import React from 'react';
import { makeStyles } from "@material-ui/styles";
import { Box,List,ListItem,Typography,Paper } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  paper: {
    backgroundColor: theme.palette.grey[100]
  }
}))

const Agreement = () => {
  const classes = useStyles();

  return (
    <Box mb={2}>
      <Box component={Paper} className={classes.paper} p={2}>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">利用規約</Typography>
          </Box>
          <Box>
            <Typography component="h6">
              この利用規約（以下，「本規約」といいます。）は，辻野翔陽(@ddpmntcpbr)（以下，「当サービス提供者」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">第1条（適用）</Typography>
          </Box>
          <Box>
            <Typography component="h6">
              本規約は，ユーザーと当サービス提供者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">第2条（利用登録）</Typography>
          </Box>
          <Box>
            <Typography component="h6">
              登録希望者が当サービス提供者の定める方法によって利用登録を申請し，当サービス提供者がこれを承認することによって，利用登録が完了するものとします。<br/>
              <br/>
              当サービス提供者は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。<br/>
              <List>
                <ListItem>（1）本規約に違反したことがある者からの申請である場合</ListItem>
                <ListItem>（2）反社会的勢力等（暴力団，暴力団員，右翼団体，反社会的勢力，その他これに準ずる者を意味します。）である，または資金提供その他を通じて反社会的勢力等の維持，運営もしくは経営に協力もしくは関与する等反社会的勢力との何らかの交流もしくは関与を行っていると当サービス提供者が判断した場合</ListItem>
                <ListItem>（3）その他，当サービス提供者が利用登録を相当でないと判断した場合</ListItem>
              </List>
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">
              第3条（ユーザーIDおよびパスワードの管理）
            </Typography>
          </Box>
          <Box>
            <Typography component="h6">
              <List>
                <ListItem>
                ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを管理するものとします。
                </ListItem>
                <ListItem>
                ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与することはできません。当サービス提供者は，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。
                </ListItem>
              </List>
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">
              第4条（禁止事項）
            </Typography>
          </Box>
          <Box>
            <Typography component="h6">
              ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。
              <List>
                <ListItem>（1）法令または公序良俗に違反する行為</ListItem>
                <ListItem>（2）犯罪行為に関連する行為</ListItem>
                <ListItem>（3）当サービス提供者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</ListItem>
                <ListItem>（4）当サービス提供者のサービスの運営を妨害するおそれのある行為</ListItem>
                <ListItem>（5）他のユーザーに関する個人情報等を収集または蓄積する行為</ListItem>
                <ListItem>（6）他のユーザーに成りすます行為</ListItem>
                <ListItem>
                  （7）当サービス提供者のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為
                </ListItem>
                <ListItem>
                  （8）当サービス提供者，本サービスの他の利用者または第三者の知的財産権，肖像権，プライバシー，名誉その他の権利または利益を侵害する行為
                </ListItem>
                <ListItem>
                  （9）過度に暴力的な表現，露骨な性的表現，人種，国籍，信条，性別，社会的身分，門地等による差別につながる表現，自殺，自傷行為，薬物乱用を誘引または助長する表現，その他反社会的な内容を含み他人に不快感を与える表現を，投稿または送信する行為
                </ListItem>
                <ListItem>
                  （10）営業，宣伝，広告，勧誘，その他営利を目的とする行為（当サービス提供者の認めたものを除きます。），性行為やわいせつな行為を目的とする行為，面識のない異性との出会いや交際を目的とする行為，他のお客様に対する嫌がらせや誹謗中傷を目的とする行為，その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為
                </ListItem>
                <ListItem>
                  （11）宗教活動または宗教団体への勧誘行為
                </ListItem>
                <ListItem>
                  （12）その他，当サービス提供者が不適切と判断する行為
                </ListItem>
              </List>
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">
              第5条（本サービスの提供の停止等）
            </Typography>
          </Box>
          <Box>
            <Typography component="h6">
              当サービス提供者は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">
            第6条（利用制限および登録抹消）
            </Typography>
          </Box>
          <Box>
            <Typography component="h6">
              ●当サービス提供者は，以下の場合には，事前の通知なく，投稿データを削除し，ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
              <List>
                <ListItem>○（1）本規約のいずれかの条項に違反した場合</ListItem>
                <ListItem>○（2）登録事項に虚偽の事実があることが判明した場合</ListItem>
                <ListItem>○（3）破産，民事再生，会社更生または特別清算の手続開始決定等の申立がなされたとき</ListItem>
                <ListItem>○（4）1年間以上本サービスの利用がない場合</ListItem>
                <ListItem>
                  ○（5）当サービス提供者からの問い合わせその他の回答を求める連絡に対して30日間以上応答がない場合
                </ListItem>
                <ListItem>○（6）第2条第2項各号に該当する場合</ListItem>
                <ListItem>○（7）その他，当サービス提供者が本サービスの利用を適当でないと判断した場合</ListItem>
              </List>
              ●前項各号のいずれかに該当した場合，ユーザーは，当然に当サービス提供者に対する一切の債務について期限の利益を失い，その時点において負担する一切の債務を直ちに一括して弁済しなければなりません。<br/>
              <br/>
              ●当サービス提供者は，本条に基づき当サービス提供者が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">
              第7条（保証の否認および免責事項）
            </Typography>
          </Box>
          <Box>
            <Typography component="h6">
              <List>
                <ListItem>
                  ●当サービス提供者は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
                </ListItem>
                <ListItem>
                  ●当サービス提供者は，本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。
                </ListItem>
                <ListItem>
                  ●当サービス提供者は，当サービス提供者の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当サービス提供者またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。
                </ListItem>
                <ListItem>
                  ●当サービス提供者は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
                </ListItem>
              </List>
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">
              第8条（サービス内容の変更等）
            </Typography>
          </Box>
          <Box>
            <Typography component="h6">
              当サービス提供者は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">
              第9条（利用規約の変更）
            </Typography>
          </Box>
          <Box>
            <Typography component="h6">
              当サービス提供者は，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">
              第10条（権利義務の譲渡の禁止）
            </Typography>
          </Box>
          <Box>
            <Typography component="h6">
              ユーザーは，当サービス提供者の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">
              第11条（準拠法・裁判管轄）
            </Typography>
          </Box>
          <Box>
            <Typography component="h6">
              <List>
                <ListItem>
                  ●本規約の解釈にあたっては，日本法を準拠法とします。
                </ListItem>
                <ListItem>
                  ●本サービスに関して紛争が生じた場合には，当サービス提供者の所在地を管轄する裁判所を専属的合意管轄とします。
                </ListItem>
              </List>
            </Typography>
          </Box>
        </Box>

        <Box mb={8}>
          <Box py={2}>
            <Typography component="h2" variant="h4">
              第12条（通知または連絡）
            </Typography>
          </Box>
          <Box>
            <Typography component="h6">
              ユーザーと当サービス提供者との間の通知または連絡は，当サービス提供者の定める方法によって行うものとします。
            </Typography>
          </Box>
        </Box>
        <Box textAlign="center">
          以上
        </Box>
      </Box>
    </Box>
  );
};

export default Agreement