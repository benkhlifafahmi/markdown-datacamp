import {useEffect, useState} from "react";
import {Dimensions} from "react-native";

export default function useOrientation() {
    const [isPortrait, setIsPortrait] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const checkOrientation = () => {
        const {width, height} = Dimensions.get('window')
        setIsPortrait(height > width);
        setIsSmallScreen(width < 420);// play around the number, for our case when the phone is smaller than 380px then we will simply play the preview/show and display of the markdown area.
        console.log(width)
    }
    useEffect(() => {
        checkOrientation();
        const orientationListner = Dimensions.addEventListener('change',event => checkOrientation())
        return () => orientationListner.remove();
    }, []);

    return {
        isPortrait,
        isSmallScreen,
    }
}
