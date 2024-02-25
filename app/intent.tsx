import React, { useState, useRef, useEffect } from "react";
import { Link } from "expo-router";
import { Text, View, Pressable, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { styled } from "nativewind";
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

export default function Intent() {
  const [noResult, setNoResult] = useState(true);

  const [statusMessage, setStatusMessage] = useState(
    "Your picture is being uploaded now and then GPT will take a minute or two. Please wait!"
  );
  const [spinnerVisible, setSpinnerVisible] = useState(true);
  const router = useRouter();
  const params = useLocalSearchParams();
  const image = params.id;
  const imageWidth = params.width;
  const imageHeight = params.height;

  useEffect(() => {
    if (!image)
      return () => {
        console.log("no image");
      };
    const ctx = canvasRef.current.getContext("2d");
    //console.log(ctx);
    var img = new window.Image();

    img.onload = function () {
      canvasRef.current.width = imageWidth;
      canvasRef.current.height = imageHeight;
      ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
      // setQueries([1,2,3]);
      // setQueriesTwo([1,2,3]);

      upload(image);
    };
    img.src = image;
    return () => {};
  }, [image]);

  function makeButton(data) {
    const websearch = "https://result.websearch-via-camera.com/en/".concat(
      data
    );
    return (
      <Pressable className="w-2/3 mt-5 mb-5 p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full font-bold py-2 px-4 inline-flex items-center">
        <Link href={websearch} asChild>
          <Text className="text-white">{data}</Text>
        </Link>
      </Pressable>
    );
  }

  function _makeButton(item) {
    const websearch = "https://result.websearch-via-camera.com/en/".concat(
      item
    );
    return (
      <Link href={websearch} asChild>
        <Pressable className="w-2/3 mt-5 mb-5 p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full font-bold py-2 px-4 inline-flex items-center">
          <Text className="text-white">{item}</Text>
        </Pressable>
      </Link>
    );
  }
  const startOver = () => {
    return (
      <StyledView className="items-center">
        <Link href="https://websearch-via-camera.com" asChild>
          <Pressable className="w-2/3 mt-5 mb-5 p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-full font-bold py-2 px-4 inline-flex items-center">
            <Text className="text-white">Start Over</Text>
          </Pressable>
        </Link>
      </StyledView>
    );
  };
  function upload(image) {
    // let resized = resize();
    const url = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doVision`;

    const url2 = `https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b706faa-8009-4af8-9ba2-0d52f5a1bed1/default/doVision2`;

    Promise.all([
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          base64: `${image}`,
        }),
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
      }).then((response) => response.json()),
      fetch(url2, {
        method: "POST",
        body: JSON.stringify({
          base64: `${image}`,
        }),
        headers: {
          "Content-Type": "application/json",
          mode: "cors",
        },
      }).then((response) => response.json()),
    ])
      .then((data) => {
        // File uploaded successfully
        // console.log(data);
        console.log(data[0]);
        console.log(data[1]);
        router.push({
          pathname: "intent",
          params: { queries: data[0], queriesTwo: data[1] },
        });
        setSpinnerVisible(false);
        setNoResult(false);
      })
      .catch((error) => {
        setStatusMessage(
          "Error uploading this file. Try with a different image!"
        );
        // setSpinnerVisible(false);
        // console.error("Error uploading the file:", error);
      });
  }

  if (params.queries) {
    let queries = params.queries.split(",");
    console.log(queries);

    let queriesTwo = params.queriesTwo.split(",");
    return (
      <StyledScrollView horizontal={false} className="flex-1 bg-white">
        {queries && queries.length > 0 && (
          <StyledText className="m-5 text-l font-bold">
            Search Intents:
          </StyledText>
        )}
        {queries && queries.length > 0 && (
          <StyledView className="items-center">
            {queries.map(_makeButton, this)}
          </StyledView>
        )}

        {queriesTwo && queriesTwo.length > 0 && (
          <StyledText className="m-5 text-l font-bold">
            Objects in the photo:
          </StyledText>
        )}
        {queriesTwo && queriesTwo.length > 0 && (
          <StyledView className="items-center">
            {queriesTwo.map(makeButton, this)}
          </StyledView>
        )}
        {((queriesTwo && queriesTwo.length > 0) ||
          (queries && queries.length > 0)) && (
          <StyledText className="m-5 text-l font-bold">
            Want to restart?
          </StyledText>
        )}
        {((queriesTwo && queriesTwo.length > 0) ||
          (queries && queries.length > 0)) &&
          startOver()}
        {queries &&
          queries.length == 0 &&
          queriesTwo &&
          queriesTwo.length == 0 && (
            <View>
              <StyledText className="p-5">
                No results for this image.{" "}
              </StyledText>
              {startOver()}
            </View>
          )}
      </StyledScrollView>
    );
  }
  console.log(params.queries);
  const PureCanvas = React.forwardRef((props, ref) => <canvas ref={ref} />);
  const canvasRef = useRef();
  return (
    <View>
      {image && noResult && (
        <View>
          <Spinner visible={spinnerVisible} />
          <StyledText className="p-5">{statusMessage} </StyledText>
          <PureCanvas ref={canvasRef} />
        </View>
      )}
      {image && !noResult && <View>{startOver()}</View>}
    </View>
  );
}
