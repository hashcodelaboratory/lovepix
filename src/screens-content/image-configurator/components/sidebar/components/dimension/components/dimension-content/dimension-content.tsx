import Box from "@mui/material/Box";
import { Tabs, Tab } from "@mui/material";
import { SyntheticEvent, useContext, useState } from "react";
import { a11yProps } from "./utils/utils";
import TabPanel from "./components/tab-panel";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../../../messages/messages";
import TabPanelBox from "./components/tab-panel-box";
import AppContext from "../../../../../../../../app-context/app-context";
import {
  dimensionsByHeight,
  dimensionsBySquare,
  dimensionsByWidth,
} from "screens-content/home/utils/configuration";

const DimensionContent = () => {
  const { t } = useTranslation();

  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    state: { dimensionId },
    stateAction: { setDimensionId },
  } = useContext(AppContext);

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant="fullWidth"
          visibleScrollbar
        >
          <Tab label={String(t(messages.byWidth))} {...a11yProps(0)} />
          <Tab label={String(t(messages.byHeight))} {...a11yProps(1)} />
          <Tab label={String(t(messages.square))} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {dimensionsByWidth.map((dim) => (
          <TabPanelBox
            selected={dim.id === dimensionId}
            x={dim.width}
            y={dim.height}
            onClick={() => setDimensionId(dim.id)}
            key={dim.id}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {dimensionsByHeight.map((dim) => (
          <TabPanelBox
            selected={dim.id === dimensionId}
            x={dim.width}
            y={dim.height}
            onClick={() => setDimensionId(dim.id)}
            style={{ width: 60, height: 80, marginRight: 10 }}
            key={dim.id}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {dimensionsBySquare.map((dim) => (
          <TabPanelBox
            selected={dim.id === dimensionId}
            x={dim.width}
            y={dim.height}
            onClick={() => setDimensionId(dim.id)}
            style={{ width: 70, height: 70, padding: 5 }}
            key={dim.id}
          />
        ))}
      </TabPanel>
    </div>
  );
};

export default DimensionContent;
