import "./config/reactotronConfig";
import React, { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from "@expo-google-fonts/archivo";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  Spartan_400Regular,
  Spartan_500Medium,
  Spartan_700Bold,
  Spartan_600SemiBold,
  Spartan_800ExtraBold,
} from "@expo-google-fonts/spartan";
import { UiProvider } from "./providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import moment from "moment";
import { MainNavigator } from "@/shared/libs/navigation";

moment.updateLocale("pt-br", {
  months:
    "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split(
      "_"
    ),
  monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
  weekdays:
    "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split(
      "_"
    ),
  weekdaysShort: "dom_seg_ter_qua_qui_sex_sáb".split("_"),
  weekdaysMin: "dom_2ª_3ª_4ª_5ª_6ª_sáb".split("_"),
  longDateFormat: {
    LT: "HH:mm",
    L: "DD/MM/YYYY",
    LL: "D [de] MMMM [de] YYYY",
    LLL: "D [de] MMMM [de] YYYY [às] LT",
    LLLL: "dddd, D [de] MMMM [de] YYYY [às] LT",
    LTS: "",
  },
  calendar: {
    sameDay: "[Hoje às] LT",
    nextDay: "[Amanhã às] LT",
    nextWeek: "dddd [às] LT",
    lastDay: "[Ontem às] LT",
    lastWeek() {
      return this.day() === 0 || this.day() === 6
        ? "[Último] dddd [às] LT" // Saturday + Sunday
        : "[Última] dddd [às] LT"; // Monday - Friday
    },
    sameElse: "L",
  },
  relativeTime: {
    future: "em %s",
    past: "%s atrás",
    s: "segundos",
    m: "um minuto",
    mm: "%d minutos",
    h: "uma hora",
    hh: "%d horas",
    d: "um dia",
    dd: "%d dias",
    M: "um mês",
    MM: "%d meses",
    y: "um ano",
    yy: "%d anos",
  },
  ordinal: "%dº" as any,
});
export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Spartan_400Regular,
    Spartan_500Medium,
    Spartan_700Bold,
    Spartan_600SemiBold,
    Spartan_800ExtraBold,
  });
  useEffect(() => {
    async function init() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.warn(error);
      }
    }
    init();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <UiProvider>
          <MainNavigator />
        </UiProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
