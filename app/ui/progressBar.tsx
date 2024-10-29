import react from 'react';

interface ProgressBarProps {
    progress: number; //expect value between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({progress}) => {
    return (
        <div style={styles.container}>
            <div style={{ ...styles.bar, width: `${progress}%`}}>

            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        height: '20px',
        backgroundColor: '#FEFAE0',
        borderRadius: '5px',
        // overflow: 'hidden',
    },

    bar: {
        height: '100%',
        backgroundColor: '#72BF78',
        borderRadius: '5px',
        transition: 'width 0.3s ease-in-out',
    },
};

export default ProgressBar;

