import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View
} from 'react-native';

class StopWatch extends Component {

    state = {
        timer: null,
        counter: '00',
        miliseconds: '00',
        startDisabled: true,
        stopDisabled: false
    }


    constructor( props ) {
        super( props );

        this.onButtonStart = this.onButtonStart.bind(this);
        this.onButtonStop = this.onButtonStop.bind(this);
        this.onButtonClear = this.onButtonClear.bind(this);
        this.start = this.start.bind(this);
    }



    componentDidMount() {
        this.start();
    }


    componentWillUnmount() {
        clearInterval(this.state.timer);
    }



    start() {
        var self = this;
        let timer = setInterval(() => {
            var num = (Number(this.state.miliseconds) + 1).toString(),
                count = this.state.counter;

            if( Number(this.state.miliseconds) == 99 ) {
                count = (Number(this.state.counter) + 1).toString();
                num = '00';
            }

            self.setState({
                counter: count.length == 1 ? '0'+count : count,
                miliseconds: num.length == 1 ? '0'+num : num
            });
        }, 0);
        this.setState({timer});
    }





    onButtonStart() {

        this.start();
        this.setState({startDisabled: true, stopDisabled: false});
    }


    onButtonStop() {
        clearInterval(this.state.timer);
        this.setState({startDisabled: false, stopDisabled: true});
    }


    onButtonClear() {
        this.setState({
            timer: null,
            counter: '00',
            miliseconds: '00'
        });
    }




    render() {
        return(

               {this.state.counter}
                {this.state.miliseconds}

                    <button title="Start" disabled="disabled"></button>
                    <button title="Stop" disabled="disabled"></button>
                    <button title="Clear" disabled="disabled"></button>


        );
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    counter: {
      fontSize: 60,
      textAlign: 'center',
      height: 60,
      margin: 10,
    },
    miniCounter: {
        fontSize:20,
        position: 'relative',
        top: -32,
        right: -50
    }
});


module.exports = StopWatch;
