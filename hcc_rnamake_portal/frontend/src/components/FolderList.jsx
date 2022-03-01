import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';

export default function FolderList(id, items) {
    return (
        <List id={id} sx={{ width:'100%', bgColor:'background.paper' }}>
            {items.map((row) => {
                <div>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={row.name} secondary={row.experimentStatus.name}/>
                </div>
            })}
        </List>
    );
}