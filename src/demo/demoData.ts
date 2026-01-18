import { SolvedProblemWithReview } from '../hooks/types';
import { JudgmentResult } from '../hooks/useJudgmentResult';

// Mock solved problems data
export const demoSolvedProblems: SolvedProblemWithReview[] = [
    {
        solvedProblemId: 1,
        problemNumber: 1000,
        problemTitle: 'A+B',
        recentSubmitAt: '2024-01-15T14:30:00',
        recentResultText: '맞았습니다!!',
        isFavorite: true,
        reviewId: 1,
        difficultyLevel: 1,
        importanceLevel: 2,
        tags: 'math,basic',
        isReviewed: true,
        reviewedAt: '2024-01-16T10:00:00',
    },
    {
        solvedProblemId: 2,
        problemNumber: 1001,
        problemTitle: 'A-B',
        recentSubmitAt: '2024-01-16T09:20:00',
        recentResultText: '맞았습니다!!',
        isFavorite: false,
        reviewId: 2,
        difficultyLevel: 1,
        importanceLevel: 1,
        tags: 'math,basic',
        isReviewed: false,
        reviewedAt: '',
    },
    {
        solvedProblemId: 3,
        problemNumber: 2557,
        problemTitle: 'Hello World',
        recentSubmitAt: '2024-01-17T11:45:00',
        recentResultText: '맞았습니다!!',
        isFavorite: false,
        reviewId: 3,
        difficultyLevel: 1,
        importanceLevel: 1,
        tags: 'output,basic',
        isReviewed: true,
        reviewedAt: '2024-01-17T12:00:00',
    },
    {
        solvedProblemId: 4,
        problemNumber: 1018,
        problemTitle: '체스판 다시 칠하기',
        recentSubmitAt: '2024-01-18T15:30:00',
        recentResultText: '맞았습니다!!',
        isFavorite: true,
        reviewId: 4,
        difficultyLevel: 3,
        importanceLevel: 4,
        tags: 'bruteforce,implementation',
        isReviewed: false,
        reviewedAt: '',
    },
    {
        solvedProblemId: 5,
        problemNumber: 1920,
        problemTitle: '수 찾기',
        recentSubmitAt: '2024-01-19T08:15:00',
        recentResultText: '맞았습니다!!',
        isFavorite: false,
        reviewId: 5,
        difficultyLevel: 2,
        importanceLevel: 3,
        tags: 'binary_search,sorting',
        isReviewed: false,
        reviewedAt: '',
    },
    {
        solvedProblemId: 6,
        problemNumber: 11047,
        problemTitle: '동전 0',
        recentSubmitAt: '2024-01-20T16:00:00',
        recentResultText: '맞았습니다!!',
        isFavorite: false,
        reviewId: 6,
        difficultyLevel: 2,
        importanceLevel: 3,
        tags: 'greedy',
        isReviewed: true,
        reviewedAt: '2024-01-20T18:00:00',
    },
    {
        solvedProblemId: 7,
        problemNumber: 1149,
        problemTitle: 'RGB거리',
        recentSubmitAt: '2024-01-21T13:45:00',
        recentResultText: '틀렸습니다',
        isFavorite: true,
        reviewId: 7,
        difficultyLevel: 4,
        importanceLevel: 5,
        tags: 'dp',
        isReviewed: false,
        reviewedAt: '',
    },
    {
        solvedProblemId: 8,
        problemNumber: 2606,
        problemTitle: '바이러스',
        recentSubmitAt: '2024-01-22T10:30:00',
        recentResultText: '맞았습니다!!',
        isFavorite: false,
        reviewId: 8,
        difficultyLevel: 3,
        importanceLevel: 4,
        tags: 'bfs,dfs,graph',
        isReviewed: true,
        reviewedAt: '2024-01-22T14:00:00',
    },
];

// Mock judgment results for each problem
export const demoJudgmentResults: Record<string, JudgmentResult[]> = {
    '1': [
        {
            id: 1,
            createdAt: '2024-01-15T14:30:00',
            updatedAt: '2024-01-15T14:30:00',
            problemId: 1000,
            userId: 1,
            submissionId: 101,
            status: 'SUCCESS',
            platform: 'BOJ',
            sourceCode: '',
            metaData: {
                submissionId: 101,
                baekjoonId: 'demo_user',
                resultText: '맞았습니다!!',
                memory: 14256,
                time: 108,
                language: 'Python 3',
                codeLength: 45,
                submittedAt: '2024-01-15T14:30:00',
            }
        },
    ],
    '2': [
        {
            id: 2,
            createdAt: '2024-01-16T09:20:00',
            updatedAt: '2024-01-16T09:20:00',
            problemId: 1001,
            userId: 1,
            submissionId: 102,
            status: 'SUCCESS',
            platform: 'BOJ',
            sourceCode: '',
            metaData: {
                submissionId: 102,
                baekjoonId: 'demo_user',
                resultText: '맞았습니다!!',
                memory: 14256,
                time: 104,
                language: 'Python 3',
                codeLength: 45,
                submittedAt: '2024-01-16T09:20:00',
            }
        },
    ],
    '3': [
        {
            id: 3,
            createdAt: '2024-01-17T11:45:00',
            updatedAt: '2024-01-17T11:45:00',
            problemId: 2557,
            userId: 1,
            submissionId: 103,
            status: 'SUCCESS',
            platform: 'BOJ',
            sourceCode: '',
            metaData: {
                submissionId: 103,
                baekjoonId: 'demo_user',
                resultText: '맞았습니다!!',
                memory: 14128,
                time: 100,
                language: 'Python 3',
                codeLength: 20,
                submittedAt: '2024-01-17T11:45:00',
            }
        },
    ],
    '4': [
        {
            id: 4,
            createdAt: '2024-01-18T15:30:00',
            updatedAt: '2024-01-18T15:30:00',
            problemId: 1018,
            userId: 1,
            submissionId: 104,
            status: 'SUCCESS',
            platform: 'BOJ',
            sourceCode: '',
            metaData: {
                submissionId: 104,
                baekjoonId: 'demo_user',
                resultText: '맞았습니다!!',
                memory: 30840,
                time: 128,
                language: 'Java 11',
                codeLength: 1245,
                submittedAt: '2024-01-18T15:30:00',
            }
        },
        {
            id: 5,
            createdAt: '2024-01-18T14:15:00',
            updatedAt: '2024-01-18T14:15:00',
            problemId: 1018,
            userId: 1,
            submissionId: 103,
            status: 'FAIL',
            platform: 'BOJ',
            sourceCode: '',
            metaData: {
                submissionId: 103,
                baekjoonId: 'demo_user',
                resultText: '틀렸습니다',
                memory: 30720,
                time: 124,
                language: 'Java 11',
                codeLength: 1180,
                submittedAt: '2024-01-18T14:15:00',
            }
        },
    ],
    '5': [
        {
            id: 6,
            createdAt: '2024-01-19T08:15:00',
            updatedAt: '2024-01-19T08:15:00',
            problemId: 1920,
            userId: 1,
            submissionId: 105,
            status: 'SUCCESS',
            platform: 'BOJ',
            sourceCode: '',
            metaData: {
                submissionId: 105,
                baekjoonId: 'demo_user',
                resultText: '맞았습니다!!',
                memory: 46780,
                time: 324,
                language: 'Python 3',
                codeLength: 280,
                submittedAt: '2024-01-19T08:15:00',
            }
        },
    ],
    '6': [
        {
            id: 7,
            createdAt: '2024-01-20T16:00:00',
            updatedAt: '2024-01-20T16:00:00',
            problemId: 11047,
            userId: 1,
            submissionId: 106,
            status: 'SUCCESS',
            platform: 'BOJ',
            sourceCode: '',
            metaData: {
                submissionId: 106,
                baekjoonId: 'demo_user',
                resultText: '맞았습니다!!',
                memory: 14256,
                time: 108,
                language: 'Python 3',
                codeLength: 185,
                submittedAt: '2024-01-20T16:00:00',
            }
        },
    ],
    '7': [
        {
            id: 8,
            createdAt: '2024-01-21T13:45:00',
            updatedAt: '2024-01-21T13:45:00',
            problemId: 1149,
            userId: 1,
            submissionId: 107,
            status: 'FAIL',
            platform: 'BOJ',
            sourceCode: '',
            metaData: {
                submissionId: 107,
                baekjoonId: 'demo_user',
                resultText: '틀렸습니다',
                memory: 30840,
                time: 136,
                language: 'Java 11',
                codeLength: 890,
                submittedAt: '2024-01-21T13:45:00',
            }
        },
    ],
    '8': [
        {
            id: 9,
            createdAt: '2024-01-22T10:30:00',
            updatedAt: '2024-01-22T10:30:00',
            problemId: 2606,
            userId: 1,
            submissionId: 108,
            status: 'SUCCESS',
            platform: 'BOJ',
            sourceCode: '',
            metaData: {
                submissionId: 108,
                baekjoonId: 'demo_user',
                resultText: '맞았습니다!!',
                memory: 14256,
                time: 112,
                language: 'Python 3',
                codeLength: 456,
                submittedAt: '2024-01-22T10:30:00',
            }
        },
    ],
};

// Mock code snippets for demo
export const demoCodeSnippets: Record<number, string> = {
    101: `# A+B (Python 3)
a, b = map(int, input().split())
print(a + b)`,
    102: `# A-B (Python 3)
a, b = map(int, input().split())
print(a - b)`,
    103: `# Hello World (Python 3)
print("Hello World!")`,
    104: `// 체스판 다시 칠하기 (Java 11)
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        char[][] board = new char[n][m];
        
        for (int i = 0; i < n; i++) {
            board[i] = sc.next().toCharArray();
        }
        
        int minCount = Integer.MAX_VALUE;
        
        for (int i = 0; i <= n - 8; i++) {
            for (int j = 0; j <= m - 8; j++) {
                int count1 = 0; // W로 시작
                int count2 = 0; // B로 시작
                
                for (int x = 0; x < 8; x++) {
                    for (int y = 0; y < 8; y++) {
                        char expected1 = ((x + y) % 2 == 0) ? 'W' : 'B';
                        char expected2 = ((x + y) % 2 == 0) ? 'B' : 'W';
                        
                        if (board[i + x][j + y] != expected1) count1++;
                        if (board[i + x][j + y] != expected2) count2++;
                    }
                }
                minCount = Math.min(minCount, Math.min(count1, count2));
            }
        }
        System.out.println(minCount);
    }
}`,
    105: `# 수 찾기 (Python 3)
import sys
input = sys.stdin.readline

n = int(input())
arr = set(map(int, input().split()))
m = int(input())
targets = list(map(int, input().split()))

for t in targets:
    print(1 if t in arr else 0)`,
    106: `# 동전 0 (Python 3)
n, k = map(int, input().split())
coins = [int(input()) for _ in range(n)]

count = 0
for coin in reversed(coins):
    count += k // coin
    k %= coin

print(count)`,
    107: `// RGB거리 (Java 11) - 틀린 코드
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] cost = new int[n][3];
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < 3; j++) {
                cost[i][j] = sc.nextInt();
            }
        }
        
        // TODO: DP 점화식 구현 필요
        // 현재 그리디 방식으로 접근해서 틀린 코드
        int total = 0;
        int prev = -1;
        for (int i = 0; i < n; i++) {
            int minCost = Integer.MAX_VALUE;
            int minIdx = 0;
            for (int j = 0; j < 3; j++) {
                if (j != prev && cost[i][j] < minCost) {
                    minCost = cost[i][j];
                    minIdx = j;
                }
            }
            total += minCost;
            prev = minIdx;
        }
        System.out.println(total);
    }
}`,
    108: `# 바이러스 (Python 3)
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    count = 0
    
    while queue:
        node = queue.popleft()
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
                count += 1
    
    return count

n = int(input())
m = int(input())
graph = {}

for _ in range(m):
    a, b = map(int, input().split())
    if a not in graph:
        graph[a] = []
    if b not in graph:
        graph[b] = []
    graph[a].append(b)
    graph[b].append(a)

print(bfs(graph, 1))`,
};

// Mock memo data
export const demoMemos: Record<number, string> = {
    1: `## A+B 문제 복습 메모

### 핵심 개념
- Python의 map() 함수 활용
- input().split()으로 공백 기준 입력 분리

### 배운 점
- 기본적인 입출력 문법 숙지 완료`,
    4: `## 체스판 다시 칠하기 복습 메모

### 풀이 접근
1. 8x8 체스판을 모든 가능한 위치에서 잘라내기
2. 각 잘라낸 체스판에서 W로 시작하는 경우와 B로 시작하는 경우 각각 계산
3. 최솟값 갱신

### 시간복잡도
- O((N-7) * (M-7) * 64) = O(N * M)

### 실수했던 부분
- 처음에 체스판 패턴을 잘못 이해함
- (i+j) % 2로 패턴을 판단하는 아이디어가 핵심`,
    7: `## RGB거리 복습 메모 (오답 노트)

### 왜 틀렸는가?
- 그리디로 접근하면 반례 존재
- 예: 현재 최소가 아니어도 전체적으로 봤을 때 최소일 수 있음

### 올바른 접근법 (DP)
- dp[i][j] = i번째 집을 j색으로 칠했을 때 최소 비용
- dp[i][0] = min(dp[i-1][1], dp[i-1][2]) + cost[i][0]
- dp[i][1] = min(dp[i-1][0], dp[i-1][2]) + cost[i][1]
- dp[i][2] = min(dp[i-1][0], dp[i-1][1]) + cost[i][2]

### TODO
- DP로 다시 풀어보기`,
    8: `## 바이러스 복습 메모

### 그래프 탐색
- BFS와 DFS 모두 가능한 문제
- 연결된 컴퍼넌트 찾기

### 구현 포인트
- 양방향 그래프로 입력 처리
- visited 체크로 무한 루프 방지
- 시작점(1번)을 제외한 감염 컴퓨터 수 출력`,
};

// Demo tags
export const demoTags = [
    { id: 1, name: 'math' },
    { id: 2, name: 'basic' },
    { id: 3, name: 'dp' },
    { id: 4, name: 'greedy' },
    { id: 5, name: 'bfs' },
    { id: 6, name: 'dfs' },
    { id: 7, name: 'graph' },
    { id: 8, name: 'binary_search' },
    { id: 9, name: 'bruteforce' },
    { id: 10, name: 'implementation' },
];
