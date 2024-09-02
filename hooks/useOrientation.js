import {useEffect, useState} from "react";
import {Dimensions} from "react-native";

export default function useOrientation() {
    const [isPortrait, setIsPortrait] = useState(false);

    const checkOrientation = () => {
        const {width, height} = Dimensions.get('window')
        setIsPortrait(height > width);
    }
    useEffect(() => {
        checkOrientation();
        const orientationListner = Dimensions.addEventListener('change',event => checkOrientation())
        return orientationListner.remove();
    }, []);

    return {
        isPortrait,
    }
}
