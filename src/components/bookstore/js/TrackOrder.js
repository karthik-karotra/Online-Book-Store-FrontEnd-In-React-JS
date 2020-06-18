import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import WhereToVoteIcon from '@material-ui/icons/WhereToVote';
import StepConnector from '@material-ui/core/StepConnector';

class TrackOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            steps: ['Ordered', 'Packed', 'Shipped', 'Delivered'],
            activeStep: 0
        }
    }

    updateOrderStatus = () => {
        for (var i = 0; i < this.state.steps.length; i++) {
            if (this.state.steps[i].toUpperCase() == this.props.orderStatus) {
                this.setState({activeStep: i})
                break;
            }
        }
    }

    componentDidMount() {
        this.updateOrderStatus();
    }

    render() {

        const ColorlibConnector = withStyles({
            alternativeLabel: {
                top: 22,
            },
            active: {
                '& $line': {
                    backgroundImage:
                        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
                },
            },
            completed: {
                '& $line': {
                    backgroundImage:
                        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
                },
            },
            line: {
                height: 3,
                border: 0,
                backgroundColor: '#eaeaf0',
                borderRadius: 1,
            },
        })(StepConnector);

        const useColorlibStepIconStyles = makeStyles({
            root: {
                backgroundColor: '#ccc',
                zIndex: 1,
                color: '#fff',
                width: 50,
                height: 50,
                display: 'flex',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
            },
            active: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
            completed: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            },
        });

        function ColorlibStepIcon(props) {
            const classes = useColorlibStepIconStyles();
            const {active, completed} = props;

            const icons = {
                1: <LocalGroceryStoreIcon/>,
                2: <CardGiftcardIcon/>,
                3: <DirectionsBoatIcon/>,
                4: <WhereToVoteIcon/>,
            };

            return (
                <div
                    className={clsx(classes.root, {
                        [classes.active]: active,
                        [classes.completed]: completed,
                    })}
                >
                    {icons[String(props.icon)]}
                </div>
            );
        }

        ColorlibStepIcon.propTypes = {
            /**
             * Whether this step is active.
             */
            active: PropTypes.bool,
            /**
             * Mark the step as completed. Is passed to child components.
             */
            completed: PropTypes.bool,
            /**
             * The label displayed in the step icon.
             */
            icon: PropTypes.node,
        };

        return (
            <Stepper activeStep={this.state.activeStep} connector={<ColorlibConnector/>} alternativeLabel>
                {this.state.steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        )
    }
}

export default TrackOrder;