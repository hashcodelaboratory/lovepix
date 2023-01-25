import Box from "@mui/material/Box";
import { Tabs, Tab } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { a11yProps } from "./utils/utils";
import TabPanel from "./components/tab-panel";
import { useTranslation } from "next-i18next";
import { messages } from "../../../../../../../../messages/messages";
import TabPanelBox from "./components/tab-panel-box";
import {
  dimensionsByHeight,
  dimensionsBySquare,
  dimensionsByWidth,
} from "screens-content/home/utils/configuration";
import { configurationsTable } from "../../../../../../../../../database.config";
import { useLiveQuery } from "dexie-react-hooks";
import { CONFIGURATION_TABLE_KEY } from "../../../../../../../../common/indexed-db/hooks/keys";

const DimensionContent = () => {
  const configuration = useLiveQuery(
    () => configurationsTable.get(CONFIGURATION_TABLE_KEY),
    []
  );

  const { t } = useTranslation();

  const [value, setValue] = useState(0);

  useEffect(() => {
    if (
      dimensionsBySquare.find((dim) => dim.id === configuration?.dimensionId)
    ) {
      setValue(2);
    }
    if (
      dimensionsByWidth.find((dim) => dim.id === configuration?.dimensionId)
    ) {
      setValue(0);
    }
    if (
      dimensionsByHeight.find((dim) => dim.id === configuration?.dimensionId)
    ) {
      setValue(1);
    }
  }, [configuration?.dimensionId]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const changeDimension = (id: string) => {
    configurationsTable.update("conf", {
      dimensionId: id,
    });
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
          variant='fullWidth'
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
            selected={dim.id === configuration?.dimensionId}
            x={dim.width}
            y={dim.height}
            onClick={() => changeDimension(dim.id)}
            key={dim.id}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {dimensionsByHeight.map((dim) => (
          <TabPanelBox
            selected={dim.id === configuration?.dimensionId}
            x={dim.width}
            y={dim.height}
            onClick={() => changeDimension(dim.id)}
            style={{ width: 60, height: 80, marginRight: 10 }}
            key={dim.id}
          />
        ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {dimensionsBySquare.map((dim) => (
          <TabPanelBox
            selected={dim.id === configuration?.dimensionId}
            x={dim.width}
            y={dim.height}
            onClick={() => changeDimension(dim.id)}
            style={{ width: 70, height: 70, padding: 5 }}
            key={dim.id}
          />
        ))}
      </TabPanel>
    </div>
  );
};

export default DimensionContent;
