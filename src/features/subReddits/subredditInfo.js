import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  ListSubheader,
  Typography,
  CardMedia,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import { getSubredditInfo } from "./subRedditsSlice";
import { numFormatter } from "../../helpers/helperFunctions";
import Loading from "../../components/loading";
import { styled } from "@mui/material/styles";
import { makeDate } from "../../helpers/helperFunctions";
import AccountsInfo from "./accountsInfo";
import { useWindowSize } from "../../helpers/helperFunctions";

const AdvertiserCategory = styled("p")(({ theme }) => ({
  color: theme.palette.primary.main,
  lineHeight: "1.5rem",
  border: "0.1rem solid rgba(255, 67, 0, 0.5)",
  borderRadius: "5rem",
  fontSize: "0.7rem",
  textTransform: "none",
 padding: theme.spacing(0, 0.5),
  whiteSpace: "nowrap",
  
}));

const SubredditDescription = styled("p")(({ theme }) => ({
 padding: theme.spacing(0.5, 2),
  margin: 0,
  textAlign: "justify",
  fontSize: "0.85rem"
}));

export const SubredditInfo = ({ selectedSubreddit }) => { 
const size = useWindowSize();
  const { loading, subredditInfo } = useSelector((state) => state.subreddit);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubredditInfo(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);
  const dateOfCreation = makeDate(subredditInfo.created).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
  });
  const allAccounts = numFormatter(subredditInfo.subscribers);
  const activeAccounts = numFormatter(subredditInfo.accounts_active);
  return (
    <>
      {loading && <Card><Loading /></Card>}
      
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
            <AdvertiserCategory sx={{display: size.width < 1050 ? "none" : "block"}}>
              {subredditInfo.advertiser_category}
            </AdvertiserCategory>
          )}
        </ListSubheader>
        <CardMedia
          component="img"
          src={subredditInfo.banner_img}
          alt="subreddit banner image"
          height="100%"
          onError={(event) => {
            event.target.style.display = "none";
            event.onerror = null;
          }}
        />
     
        <SubredditDescription>
            {subredditInfo.public_description}
          </SubredditDescription>
          <ListItem>
            <AccountsInfo num={allAccounts} text={"Subreddits"}/>
            <AccountsInfo num={activeAccounts} text={"Online 🟢"}/>
          </ListItem>
          <ListItem sx={{pt: 0}}>
            <ListItemIcon sx={{ minWidth: "2rem" }}>
              <CakeIcon aria-label="date of creation" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="body2">
                Created:{" "}
                {dateOfCreation}
              </Typography>
            </ListItemText>
          </ListItem>
</Card>
      
    </>
  );
};

export default SubredditInfo;
