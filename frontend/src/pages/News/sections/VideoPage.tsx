import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { RootState } from '../../../store/store';
import { Box, Container, Icon, Stack, Typography, Button } from '@mui/material';
import { Facebook, Instagram, PlayCircleFilledOutlined, Twitter } from '@mui/icons-material';
import RecommendNews from '../../../components/RecommendNews';

const VideoPage = () => {
  const { id } = useParams();
  const article = useSelector((state: RootState) =>
    state.news.articles.find((article) => article.id === Number(id))
  );

  const [isPlaying, setIsPlaying] = useState(false);

  if (!article) {
    return <h1>Article not found</h1>;
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        maxWidth: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          gap: 5,
          maxWidth: 858,
          marginTop: '30px',
        }}
      >
        {/* Article Title & Date */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              color: 'secondary.main',
            }}
          >
            {article.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'grey.600',
            }}
          >
            17 Nov 2021 | TIX ID
          </Typography>
        </Box>

        {/* Video Player with Play Button */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: { xs: 600, sm: 700, lg: 858 },
            height: { xs: 300, sm: 400, lg: 447 },
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          {/* Video Player */}
          {isPlaying ? (
            <video
              src={article.videoUrl || 'https://www.w3schools.com/html/movie.mp4'}
              controls
              autoPlay
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            // Play Button to Start Video
            <Box
              component="img"
              src={article.image}
              alt="Video Thumbnail"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
          {!isPlaying && (
            <Button
              variant="contained"
              onClick={() => setIsPlaying(true)}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'transparent',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '50%',
                fontSize: '24px',
              }}
            >
              <PlayCircleFilledOutlined 
              sx={{
                fontSize:70,
                color:'grey.200'
              }}/>
            </Button>
          )}
        </Box>

        {/* Share Options */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Typography variant="h3">Share this article</Typography>
          <Stack direction="row" spacing={1.5}>
            <Icon sx={{ color: 'secondary.main' }}>
              <Instagram />
            </Icon>
            <Icon sx={{ color: 'secondary.main' }}>
              <Twitter />
            </Icon>
            <Icon sx={{ color: 'secondary.main' }}>
              <Facebook />
            </Icon>
          </Stack>
        </Box>
      </Container>

      {/* Other Recommended Articles */}
      <Box
        sx={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h2">See Other Articles</Typography>
        <RecommendNews currentArticleId={Number(id)} />
      </Box>
    </Container>
  );
};

export default VideoPage;
