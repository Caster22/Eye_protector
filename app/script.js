import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
    constructor() {
        super();

        setInterval(() => {
            if(this.state.status !== 'off') this.changeTimerStatus(1);
        }, 1000);
    }

    state = {
        status: 'off',
        timer: 1200,
        audio: new Audio('./sounds/bell.wav'),
    }

    changeStatusWork = () => {
        this.setState({ status: 'work' });
        this.setState({ timer: 1200 });
    }

    changeStatusRest = () => {
        this.setState({ status: 'rest' });
        this.setState({ timer: 20 });
    }

    changeStatusOff = () => {
        this.setState({ status: 'off' });
    }

    playAudio = () => {
        this.state.audio.play();
    };

    changeTimerStatus = sub => {
        const actualMin = this.state.timer - sub;

        this.setState({ timer: actualMin });

        if (actualMin <= 0 && this.state.status === 'work') {
            this.changeStatusRest();
            this.playAudio();
        } else if (actualMin <= 0 && this.state.status === 'rest') {
            this.changeStatusWork();
            this.playAudio();
        }
    }

    timeFormat = (timer) => (
        `${Math.floor(timer/60) < 10 ? '0' + Math.floor(timer/60) : Math.floor(timer/60)}
        : ${timer%60 < 10 ? '0' + timer%60 : timer%60 === 60 ? '00' : timer%60}`
    );

    render() {
        const { status, timer } = this.state;
        return (
            <div>
                <h1>Protect your eyes</h1>
                {status === 'off'
                    ?
                    <div>
                        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
                        <p>This app will help you track your time and inform you when it's time to rest.</p>
                    </div>
                    :
                    null
                }
                {status === 'work' ? <img src='./images/Work.png' /> : null}
                {status === 'rest' ? <img src='./images/Rest.png' /> : null}

                {status !== 'off' ? <div className='timer'>{this.timeFormat(timer)}</div> : null}

                {status === 'off' ? <button className='btn' onClick={() => this.changeStatusWork()}>Start</button> : null}
                {status !== 'off' ? <button className='btn' onClick={() => this.changeStatusOff()}>Stop</button> : null}
                <button className='btn btn-close' onClick={() => window.close()}>X</button>
            </div>
        )
    }
}

render(<App />, document.querySelector('#app'));
