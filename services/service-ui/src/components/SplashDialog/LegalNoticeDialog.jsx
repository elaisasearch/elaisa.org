import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Dialog, Divider } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import logo from '../../assets/img/logo.png';
import { Translate } from 'react-localize-redux';

const styles = theme => ({
    root: {
        margin: 0,
        padding: '2vh',
    },
    closeButton: {
        position: 'absolute',
        right: '1vh',
        top: '1vh',
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: '2vh',
    },
}))(MuiDialogContent);

export default function SplashDialog(props) {

    const { open, handleClose } = props;

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                scroll='paper'
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <Translate id="UI__LEGAL_NOTICE__TITLE" />
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Typography paragraph>
                        <img src={logo} alt='logo' width='30%' />
                        <br />
                        <br />
                        <b>Mandatory information according to §5 Telemediengesetz</b>
                        <br />
                        <br />
                        <b>Elaisa Search</b>
                        <br />
                        Universitätsstraße 1 <br />
                        40225 Düsseldorf <br />
                        Germany
                        <br />
                        <br />
                        Tel.: +49 211 81-11535 <br />
                        Fax:  +49 211 81-12917 <br />
                        <br />
                        <a href= "mailto:info@elaisa.org">info@elaisa.org</a> <br />
                        <a href='http://elaisa.org'>www.elaisa.org</a>
                        <br />
                        <br />
                        <b>Represented by:</b> <br />
                        Alexander Teusz
                    </Typography>
                    <Divider />
                    <br />
                    <Typography paragraph variant='headline'>
                        Disclaimer
                    </Typography>
                    <Typography paragraph>
                        Despite careful content control, we assume no liability for the content of external links. The content of the linked pages are the sole responsibility of their operators.
                    </Typography>
                    <Typography paragraph>
                        <b>Liability for content</b> <br />
                        The contents of our pages were created with great care. For the accuracy, completeness and timeliness of the contents, however, we can not guarantee. As a service provider we are responsible according to § 7 Abs.1 TMG for own contents on these sides according to the general laws. According to §§ 8 to 10 TMG, however, we as a service provider are not obliged to monitor transmitted or stored external information or to investigate circumstances that indicate an illegal activity. Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the moment of knowledge of a specific infringement. Upon notification of appropriate violations, we will remove this content immediately.
                    </Typography>
                    <Typography paragraph>
                        <b>Copyright</b> <br />
                        The content and works on these pages created by the site operators are subject to German copyright law. The duplication, processing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are for private, non-commercial use only. As far as the contents on this side were not created by the operator, the copyrights of third parties are considered. In particular contents of third parties are marked as such. Should you still be aware of a copyright infringement, we ask for a note. Upon notification of violations, we will remove such content immediately.
                    </Typography>
                    <Typography paragraph>
                        <b>Note for warnings:</b> <br />
                        No warning without previous contact. If the content or the presentation of this site infringes the rights of third parties / strangers or statutory provisions, we ask for a corresponding message without cost note. The elimination of an infringement of intellectual property rights by this right may not take place without our consent. We guarantee that the rightly disputed passages are removed immediately, without you being required to intervene on a legal basis. However, we will completely reject any costs incurred by you without prior contact and, if necessary, file a counterclaim for breach of the aforementioned provisions. Thank you for your understanding.
                    </Typography>
                </DialogContent>
            </Dialog>
        </div>
    );
}
