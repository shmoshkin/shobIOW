import React, {Component} from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { images } from '../static/images/Images';

const styles = theme => ({
    quickLinkCard: {
        width: '170px',
        float: 'left',
        marginLeft: '15px',
        marginRight: '15px',
        textAlign: 'center'
    },
    quickLinkImg: {
        height: '80px'
    },
    quickLinkRef: {
        fontSize: "20px",
        textDecoration: "none"
    }
  });

class QuickLinks extends Component {    
    render() {      
        const { classes } = this.props;
        
        let linksNodes = this.props.data.map((link, i) => {
            return (            
                <Card key={i} className={classes.quickLinkCard}>
                    <CardMedia
                        className={classes.quickLinkImg}
                        image={images[link.image].url}
                        title={link.title}
                    />
                    <CardContent>
                        <Typography variant="headline" component="h2">
                        <a className={classes.quickLinkRef} href={link.url}>{link.title}</a>
                        </Typography>
                        <Typography component="p">
                            {link.description}
                        </Typography>
                    </CardContent>
                </Card>
            )
        })
        
        return (
            <div>
                {linksNodes}
            </div>
        )
    }        
}

QuickLinks.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired    
};

export default withStyles(styles)(QuickLinks);
   