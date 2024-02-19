import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import baseurl from '../../constants';

const initialState = {
  user: null,
  highscores: [],
  isScoreUpdated: true,
};

export const fetchHighscore = createAsyncThunk('fetchHighscore', async (_, { getState }) => {
  const { user } = getState().user;
  try {
    const response = await fetch(`${baseurl}/users/highest`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch highscore');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching highscore:', error.message);
    throw error; // Rethrow the error to handle it in the component
  }
});

export const updateScore = createAsyncThunk('updateScore', async (_, { getState }) => {
  try {
    const { user } = getState().user;
    console.log("user",user)
    const response = await fetch(`${baseurl}/users/updatescore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update score');
    }

    return data;
  } catch (error) {
    console.error('Error updating score:', error);
    throw error;
  }
});


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
    },
    logoutUser: (state) => {
        state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHighscore.fulfilled, (state, action) => {
      console.log('Score updated successfully', action.payload);
      state.highscores = action.payload;
      state.user.score = action.payload.find(user => user.id === state.user.id)?.score || 0;
    });
    
    builder.addCase(fetchHighscore.rejected, (state, action) => {
        // state.isLoading = false;
        // state.highscores = action.payload
        console.error('Error fetching highscore:', action.error.message);
    })

    builder.addCase(updateScore.fulfilled, (state, action) => {
        state.isScoreUpdated = true;
        state.user.score += 1;
        // state.highscores = action.payload
    })

  }
})


export const { setUser, logoutUser } = userSlice.actions

export default userSlice.reducer