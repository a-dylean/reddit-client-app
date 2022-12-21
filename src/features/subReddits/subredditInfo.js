import React from "react";
import { useSelector } from "react-redux";
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

export const SubredditInfo = () => {
  const selectedSubreddit = useSelector(
    (state) => state.post.selectedSubreddit
  );
  const created = new Date(selectedSubreddit?.created * 1000);
  console.log(created);
  return (
    <>
      <Card>
        <ListSubheader>
          ABOUT{" "}
          {(selectedSubreddit &&
            selectedSubreddit.display_name.toUpperCase()) ||
            " HOME "}{" "}
          COMMUNITY
          {selectedSubreddit?.advertiser_category && (
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
                }}
              >
                {selectedSubreddit.advertiser_category}
              </Typography>
            </Box>
          )}
        </ListSubheader>
        {selectedSubreddit?.banner_img && (
          <CardMedia
            component="img"
            src={selectedSubreddit.banner_img}
            alt="post image"
            height="100%"
          ></CardMedia>
        )}
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              px: "1rem",
              textAlign: "justify",
            }}
          >
            {selectedSubreddit && selectedSubreddit.public_description}
          </Typography>
          <ListItem>
            <ListItemIcon sx={{ minWidth: "2rem" }}>
              <CakeIcon aria-label="date of creation" color="disabled" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h7" color="grey">
                Created:{" "}
                {selectedSubreddit
                  ? created.toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "short",
                    })
                  : "Jan 2009"}
              </Typography>
            </ListItemText>
          </ListItem>
        </CardContent>
      </Card>
    </>
  );
};

export default SubredditInfo;
