import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  ListSubheader,
  Typography,
  CardMedia,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import { Box } from "@mui/system";
import { getSubredditInfo } from "./subRedditsSlice";

export const SubredditInfo = ({ selectedSubreddit }) => {
  const subredditInfo = useSelector((state) => state.subreddit.subredditInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubredditInfo(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);
  const created = new Date(subredditInfo.created * 1000);
  return (
    <>
      <Card>
        <ListSubheader sx={{ textTransform: "uppercase" }}>
          {`ABOUT 
          ${subredditInfo.display_name}
          COMMUNITY`}
          {subredditInfo.advertiser_category && (
            <Box
              sx={{ m: 0, p: "0 1rem", position: "absolute", right: 0, top: 0 }}
            >
              <Typography
                variant="h9"
                sx={{
                  color: "#FF4300",
                  border: "0.1rem solid rgba(255, 67, 0, 0.5)",
                  borderRadius: 50,
                  fontSize: "0.6rem",
                  px: "0.3rem",
                  py: "0.2rem",
                  textTransform: "none",
                }}
              >
                {subredditInfo.advertiser_category}
              </Typography>
            </Box>
          )}
        </ListSubheader>
        <CardMedia
          component="img"
          src={subredditInfo.banner_img}
          alt="post image"
          height="100%"
          onError={(event) => {
            event.target.style.display = "none";
            event.onerror = null;
          }}
        />
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              px: "1rem",
              textAlign: "justify",
            }}
          >
            {subredditInfo.public_description}
          </Typography>
          <ListItem sx={{display: "flex", justifyContent: "space-evenly"}}>
            <Typography>{subredditInfo.subscribers}</Typography>
            <Typography>{subredditInfo.accounts_active}</Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon sx={{ minWidth: "2rem" }}>
              <CakeIcon aria-label="date of creation" color="disabled" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h7" color="grey">
                Created:{" "}
                {created.toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                })}
              </Typography>
            </ListItemText>
          </ListItem>
        </CardContent>
      </Card>
    </>
  );
};

export default SubredditInfo;
