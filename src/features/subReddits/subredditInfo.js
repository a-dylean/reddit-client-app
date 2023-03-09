import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  ListSubheader,
  Typography,
  CardMedia,
  ListItemText,
  ListItem,
} from "@mui/material";
import { getSubredditInfo } from "./subRedditsSlice";
import { numFormatter } from "../../helpers/helperFunctions";
import Loading from "../../components/loading";
import { styled } from "@mui/material/styles";
import { makeDate } from "../../helpers/helperFunctions";
import AccountsInfo from "./accountsInfo";
import { TextTypography } from "../../helpers/textTypography";

const AdvertiserCategory = styled("p")(({ theme }) => ({
  color: theme.palette.primary.main,
  lineHeight: theme.spacing(3),
  border: `${theme.spacing(0.1)} solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(5),
  fontSize: theme.typography.h7.fontSize,
  textTransform: "none",
  padding: theme.spacing(0, 0.5),
  whiteSpace: "nowrap",
}));

const SubredditDescription = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.5, 2),
  margin: 0,
  textAlign: "justify"
}));

export const SubredditInfo = ({ selectedSubreddit }) => {
  const { loading, subredditInfo } = useSelector((state) => state.subreddit);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubredditInfo(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

 if (!subredditInfo) {
    return null;
  }
  const dateOfCreation = makeDate(subredditInfo.created).toLocaleDateString(
    "en-us",
    {
      year: "numeric",
      month: "short",
    }
  );
 
  const allAccounts = numFormatter(subredditInfo.subscribers);
  const activeAccounts = numFormatter(subredditInfo.accounts_active);

  return (
    <>
      {loading && (
        <Card>
          <Loading />
        </Card>
      )}

      <Card>
        <ListSubheader
          sx={{
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {`ABOUT 
          ${subredditInfo.display_name}
          COMMUNITY`}
          {subredditInfo.advertiser_category && (
            <AdvertiserCategory
              sx={{ display: { xs: "none", sm: "none", md: "none", lg: "block", xl: "block"} }}
            >
              {subredditInfo.advertiser_category}
            </AdvertiserCategory>
          )}
        </ListSubheader>
        {subredditInfo.banner_img && <CardMedia
          component="img"
          src={subredditInfo.banner_img}
          alt="subreddit banner image"
          height="100rem"
        />}
        {subredditInfo.public_description && <SubredditDescription><Typography variant="body2">
         <TextTypography text={subredditInfo.public_description} /></Typography>
        </SubredditDescription>}
        <ListItem dense divider>
          <AccountsInfo num={allAccounts} text={"Subscribers"} />
          <AccountsInfo num={activeAccounts} text={"Online 🟢"} />
        </ListItem>
        <ListItem dense>
          <ListItemText>
            <Typography variant="body2">Created: {dateOfCreation}</Typography>
          </ListItemText>
        </ListItem>
      </Card>
    </>
  );
};

export default SubredditInfo;
