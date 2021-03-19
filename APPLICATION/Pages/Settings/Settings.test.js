import React from 'react';
import TestRenderer from 'react-test-renderer';

import Settings from './Settings';
import ConfigProvider from "../../Config/ConfigProvider";



test("Settings should render without throwing error and match Snapshot", async () => {
    const element = new TestRenderer.create(
        <ConfigProvider> <Settings /> </ConfigProvider>
    );

    expect(element).toMatchSnapshot();
});