import { Paper } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors, materialDark, materialLight, prism, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeArea() {
    const codeString = `
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        int[] honeyArr = new int[N];
        StringTokenizer st = new StringTokenizer(br.readLine());

        for (int i = 0; i < N; i++) {
            honeyArr[i] = Integer.parseInt(st.nextToken());
        }

        int[] left2RightPrefixSum = Arrays.copyOf(honeyArr, honeyArr.length);
        int[] right2LeftPrefixSum = Arrays.copyOf(honeyArr, honeyArr.length);
        for (int i = 1; i < N; i++) {
            left2RightPrefixSum[i] += left2RightPrefixSum[i - 1];
        }
        for (int i = N - 2; i >= 0; i--) {
            right2LeftPrefixSum[i] += right2LeftPrefixSum[i + 1];
        }
        int ans = 0;
        //벌 꿀
        int sum = 0;
        int bee1 = 0;
        bee1 += left2RightPrefixSum[N - 1] - left2RightPrefixSum[0];
        sum += bee1;
        for (int i = 1; i < N - 1; i++) {
            sum = Math.max(sum, bee1 + (left2RightPrefixSum[N - 1] - left2RightPrefixSum[i]) - honeyArr[i]);
        }
        ans = sum;
        //꿀 벌
        bee1 = right2LeftPrefixSum[0] - right2LeftPrefixSum[N - 1];
        sum = bee1;
        for (int i = N - 2; i >= 1; i--) {
            sum = Math.max(sum, bee1 + (right2LeftPrefixSum[0] - right2LeftPrefixSum[i]) - honeyArr[i]);
        }
        ans = Math.max(ans, sum);
        //벌 벌
        for (int i = 1; i < N - 1; i++) {
            int honeyPotPosition = i;
            int beee1 = left2RightPrefixSum[i] - left2RightPrefixSum[0];
            int beee2 = right2LeftPrefixSum[i] - right2LeftPrefixSum[N - 1];

            ans = Math.max(ans, beee1 + beee2);
        }
        System.out.println(ans);

    }
}

    `;

    return (
        <Paper
            style={{
                height: 'calc(100vh - 60px - 50px)', // 앱바 높이와 여백 제외
                padding: 10, 
                backgroundColor: '#f4f4f4',
                overflow: 'auto', // 스크롤 가능
            }}
        >
            <SyntaxHighlighter language="java" style={vs}>
                {codeString}
            </SyntaxHighlighter>
        </Paper>
    );
}

export default CodeArea;
