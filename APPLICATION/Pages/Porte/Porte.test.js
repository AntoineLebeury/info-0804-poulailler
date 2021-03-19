import React from 'react';
import TestRenderer from 'react-test-renderer';

import Porte from './Porte';
import ConfigProvider from "../../Config/ConfigProvider";



test("Porte should render without throwing error and match Snapshot", async () => {
    const element = new TestRenderer.create(
        <ConfigProvider> <Porte /> </ConfigProvider>
    );

    expect(element).toMatchSnapshot();
});