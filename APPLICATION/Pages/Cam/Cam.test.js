import React from 'react';
import TestRenderer from 'react-test-renderer';

import Cam from './Cam';
import ConfigProvider from "../../Config/ConfigProvider";



test("Cam should render without throwing error and match Snapshot", async () => {
    const element = new TestRenderer.create(
        <ConfigProvider> <Cam /> </ConfigProvider>
    );

    expect(element).toMatchSnapshot();
});