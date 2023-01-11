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
  ListItem
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import { Box } from "@mui/system";
import { getSubredditInfo } from "./subRedditsSlice";
import { numFormatter } from "../../components/helperFunctions";

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
          alt="subreddit banner image"
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
              p: "0.5rem 1rem  0",
              textAlign: "justify",
            }}
          >
            {subredditInfo.public_description}
          </Typography>
          <ListItem sx={{ pb: 0 }}>
            <ListItemText sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h7" sx={{ fontSize: "1.5rem" }}>
                {numFormatter(subredditInfo.subscribers)}
                <br />
              </Typography>
              <Typography variant="h7">Surscribers</Typography>
            </ListItemText>
            <ListItemText sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h7" sx={{ fontSize: "1.5rem" }}>
                {numFormatter(subredditInfo.accounts_active)}
              </Typography>
              <br />
              <Typography variant="h7">Online 🟢</Typography>
            </ListItemText>
          </ListItem>
          <ListItem sx={{ pt: 0 }}>
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
