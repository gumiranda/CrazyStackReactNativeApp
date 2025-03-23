import { useWindowDimensions, Text } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { DynamicStyleSheet, fonts } from "@/shared/libs/utils";
import { RFValue } from "react-native-responsive-fontsize";
import { Place } from "../../molecules/place";
import { useNavigation } from "@react-navigation/native";

export const Places = ({ data }: PlacesProps) => {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = { min: 258, max: dimensions.height - 174 };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        renderItem={({ item }) => (
          <Place
            data={item}
            onPress={() => {
              navigation.navigate("PlaceDetails", { place: item, name: item?.name });
            }}
          />
        )}
        keyExtractor={(item) => item?._id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Text style={styles.title}>Explore locais perto de você</Text>
        }
      />
    </BottomSheet>
  );
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: { backgroundColor: theme.colors.gray[100] },
  content: {
    gap: 12,
    padding: 24,
    paddingBottom: 100,
  },
  indicator: {
    width: 80,
    height: 4,
    backgroundColor: theme.colors.gray[300],
  },
  title: {
    color: theme.colors.gray[700],
    fontSize: RFValue(16),
    fontFamily: fonts.primary_400,
    marginBottom: 16,
  },
}));
export type PlacesProps = {
  data: PlaceProps[];
};
export type PlaceProps = {
  _id: string;
  name: string;
  description: string;
  cover: string;
  address: string;
  profilephoto: string;
  coupons: number;
};
