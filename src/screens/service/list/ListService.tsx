/* eslint-disable react-hooks/rules-of-hooks */
import { DynamicStyleSheet, useTheme } from "@/shared/libs/utils";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth, useUi } from "@/app/providers";
import { FlashList } from "@shopify/flash-list";
import { useListService } from "./useListService.hook";
import { TextAtom } from "@/shared/ui";

export const ListService = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { showModal } = useUi();
  const { serviceListCount, serviceList } = useListService({ user });
  if (serviceList?.length > 0) {
    return (
      <>
        {serviceList?.length > 0 && (
          <FlashList
            data={serviceList}
            renderItem={({ item }: any) => <TextAtom>{item?.name}</TextAtom>}
            estimatedItemSize={200}
          />
        )}
        <StatusBar style="auto" />
      </>
    );
  }
  return null;
};
const styles = DynamicStyleSheet.create((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
}));
